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

        const user = await authorized(["teacher", "admin"]);
        if (!user) return unauthorized();

        // ✅ 2. Input validation
        const { title, content, tags, class_id, club_id, images_path, bucket_id, images_id } = await req.json();
        if (!title || !content) return badRequest("Missing required fields: title or content");

        // ✅ 3. Database connection
        const supabase = await createClient();

        let status = "pending";
        let postPayload: any = {
            title,
            content,
            author_id: user.id,
            school_id: user.school_id,
            images_path,
            bucket_id,
            images_id,
        }

        if (user.role === "teacher") {

        }

        // ✅ 4. Query logic
        const { data, error } = await supabase
            .from("posts")
            .insert({
                title,
                content,
                author_id: user.id,        // comes from your users table
                school_id: user.school_id, // comes from your users table
                status: "pending",
            })
            .select();

        if (error) throw error;

        // ✅ 5. Success response
        return successResponse(data, "Post created successfully", 201);

    } catch (err) {
        return handleApiError(err, "POST /posts");
    }
}

export async function GET(req: NextRequest) {
    try {
        const user = await authorized(["teacher", "admin", "superadmin"]);
        if (!user) return unauthorized();

        const supabase = await createClient();
        const searchParams = req.nextUrl.searchParams;
        const postType = searchParams.get("post_type"); // optional filter

        let query = supabase.from("posts").select("*");

        if (user.role === "teacher") {
            query = query.eq("author_id", user.id); // only own posts
        } else {
            query = query.eq("school_id", user.school_id); // all posts in school
            if (postType) query = query.eq("post_type", postType); // filter only for admins
        }

        const { data, error } = await query.order("created_at", { ascending: false });

        if (error) throw error;

        return successResponse(data, "Posts fetched successfully");
    } catch (err) {
        return handleApiError(err, "GET /posts");
    }
}

