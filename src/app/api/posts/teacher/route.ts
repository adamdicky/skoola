// GET (teacher's posts) and POST (create teacher post)

import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { authorized } from "@/utils/api/auth";
import {
    handleApiError,
    successResponse,
    badRequest,
    unauthorized,
} from "@/utils/api/baseHandler";

// ===================================
// POST: Create a new post (Teacher only)
// ===================================
export async function POST(req: NextRequest) {
    try {
        // 1. Authorization: Only allow teachers
        const users = await authorized(["teacher"]);
        if (!users) return unauthorized();

        // 2. Input validation (teacher posts specify class/club based on assignment)
        const { title, content, tags, images_path, bucket_id, images_id } = await req.json();
        if (!title || !content) return badRequest("Missing required fields: title or content");

        // Use the teacher's assigned class/club IDs from the user session
        const assignedClassId = users.class_id;
        const assignedClubId = users.club_id;

        if (!assignedClassId && !assignedClubId) {
            return badRequest("Your account is not assigned to any class or club. Please contact school's admin.");
        }

        // Determine the post type based on assignment
        let postType: "class" | "club" = assignedClassId ? "class" : "club";

        // 3. Database connection
        const supabase = await createClient();

        const postPayload: any = {
            title,
            content,
            author_id: users.id, // Set author to logged-in teacher
            school_id: users.school_id,
            images_path,
            bucket_id,
            images_id,
            class_id: assignedClassId,
            club_id: assignedClubId,
            post_type: postType,
            status: "pending", // Always pending for teacher posts
        }

        // 4a. Insert the post and retrieve the new ID
        const { data: insertedPost, error } = await supabase
            .from("posts")
            .insert(postPayload)
            .select("id")
            .single();

        if (error) throw error;

        const newPostId = insertedPost.id;

        // 4b. Handle Tags: Upsert tags and insert into post_tags junction table
        if (tags) {
            const tagNames = (tags as string)
                .split(',')
                .map(tag => tag.trim().toLowerCase())
                .filter(name => name.length > 0);

            if (tagNames.length > 0) {
                const tagsToUpsert = tagNames.map(name => ({ name }));

                const { data: tagRecords, error: tagsError } = await supabase
                    .from('tags')
                    .upsert(tagsToUpsert, { onConflict: 'name' })
                    .select('id');

                if (tagsError) throw tagsError;

                const tagIds = tagRecords.map(t => t.id);

                const postTagsPayload = tagIds.map(tag_id => ({
                    post_id: newPostId,
                    tag_id: tag_id,
                }));

                const { error: postTagsError } = await supabase
                    .from('post_tags')
                    .insert(postTagsPayload);

                if (postTagsError) throw postTagsError;
            }
        }

        // 5. Success response 
        return successResponse({ id: newPostId }, "Post created successfully and sent for approval.", 201);

    } catch (err) {
        return handleApiError(err, "POST /posts/teacher");
    }
}


// ===================================
// GET: Fetch teacher's posts (Filtered by author_id)
// ===================================
export async function GET(req: NextRequest) {
    try {
        // 1. Authorization: Only allow teachers
        const users = await authorized(["teacher"]);
        if (!users) return unauthorized();

        const supabase = await createClient();
        const searchParams = req.nextUrl.searchParams;

        // Dashboard filters
        const statusFilter = searchParams.get("status") || "all"; // all | approved | pending | remarked | rejected
        const sort = searchParams.get("sort") || "newest"; // newest | oldest

        let query = supabase
            .from("posts")
            .select(
                `
                *,
                users!author_id(displayname, role),
                classes(name),
                clubs(name),
                schools(name),
                remarks(*),
                post_tags(tags(name))
                `
            )
            // CRITICAL FILTER: Only fetch posts authored by the current user
            .eq("author_id", users.id);

        // Apply status filter 
        if (statusFilter !== "all") {
            query = query.eq("status", statusFilter);
        }

        // Apply sorting
        if (sort === "newest") {
            query = query.order("created_at", { ascending: false });
        } else if (sort === "oldest") {
            query = query.order("created_at", { ascending: true });
        }

        const { data, error } = await query;

        if (error) throw error;

        return successResponse(data, "Teacher posts fetched successfully.", 200);
    } catch (err) {
        return handleApiError(err, "GET /posts/teacher");
    }
}