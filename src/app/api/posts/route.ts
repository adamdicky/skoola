//GET (all//filter) posts, POST (create new post)

import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { authorized } from "@/utils/api/auth";
import {
    handleApiError,
    successResponse,
    badRequest,
    unauthorized,
} from "@/utils/api/baseHandler";

export async function POST(req: NextRequest) {
    try {

        const users = await authorized(["teacher", "admin"]);
        if (!users) return unauthorized();

        // ✅ 2. Input validation
        const { title, content, tags, class_id, club_id, images_path, bucket_id, images_id } = await req.json();
        if (!title || !content) return badRequest("Missing required fields: title or content");

        // ✅ 3. Database connection
        const supabase = await createClient();

        let postPayload: any = {
            title,
            content,
            author_id: users.id,
            school_id: users.school_id,
            images_path,
            bucket_id,
            images_id,
            status: "pending", //default for teacher
        }

        if (users.role === "teacher") {
            if (!class_id && !club_id) {
                return badRequest("Current account is not assigned to any class or club. Please contact school's admin to get assigned.")
            }

            postPayload = { ...postPayload, class_id, club_id, post_type: class_id ? "class" : "club" }
        }

        if (users.role === "admin") {
            postPayload = { ...postPayload, post_type: "school", status: "approved" }

        }

        // ✅ 4. Query logic
        const { data: insertedPost, error } = await supabase
            .from("posts")
            .insert(postPayload)
            .select("id")
            .single();

        if (error) throw error;

        const newpostId = insertedPost.id;

        if (tags) {
            const tagNames = (tags as string).split(',').map(tag => tag.trim().toLowerCase()).filter(name => name.length > 0);

            if (tagNames.length > 0) {
                const tagsToInsert = tagNames.map(name => ({ name }));

                const { data: tagRecords, error: tagError } = await supabase
                    .from("tags")
                    .upsert(tagsToInsert, { onConflict: "name" })
                    .select("id");

                if (tagError) throw tagError;

                const tagIds = tagRecords.map((tag) => tag.id);

                const postTagsPayload = tagIds.map(tag_id => ({
                    post_id: newpostId,
                    tag_id: tag_id,
                }));

                const { error: postTagsError } = await supabase
                    .from("post_tags")
                    .insert(postTagsPayload);

                if (postTagsError) throw postTagsError;
            }
        }

        // ✅ 5. Success response
        return successResponse({ id: newpostId }, "Post created successfully", 201);

    } catch (err) {
        return handleApiError(err, "POST /posts");
    }
}

export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const searchParams = req.nextUrl.searchParams;

        const tab = searchParams.get("tab") || "All"; // All | School | Classes | Clubs
        const sort = searchParams.get("sort") || "newest"; // newest | oldest
        const tag = searchParams.get("tag"); // optional tag filter

        let query = supabase
            .from("posts")
            .select(
                `
                *,
                users(displayname, role),
                classes(name),
                clubs(name),
                schools(name)
                `
            )
            .eq("status", "approved"); //only show approved posts to public

        switch (tab.toLowerCase()) {
            case "school":
                query = query.eq("post_type", "school");
                break;
            case "classes":
                query = query.eq("post_type", "class");
                break;
            case "clubs":
                query = query.eq("post_type", "club");
                break;
            default:
                "All";
                break;
        }

        if (tag) {
            //join via post_tags table
            const { data: taggedPosts, error: tagError } = await supabase
                .from("post_tags")
                .select("post_id, tags(name)")
                .eq("tags.name", tag);

            if (tagError) throw tagError;

            const postIds = taggedPosts?.map((p) => p.post_id);
            if (!postIds || postIds.length === 0) {
                return successResponse([], "No posts found for this tag", 200);
            }

            query = query.in("id", postIds);
        }

        if (sort === "newest") {
            query = query.order("created_at", { ascending: false });
        } else if (sort === "oldest") {
            query = query.order("created_at", { ascending: true });
        }

        const { data, error } = await query;

        if (error) throw error;

        return successResponse(data, "Post fetched successfully.", 200);
    } catch (err) {
        return handleApiError(err, "GET /posts");
    }
}

