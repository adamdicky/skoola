import { createClient } from "@/utils/supabase/server";

type Role = "teacher" | "admin" | "superadmin";

/**
 * ✅ Authorization utility
 * - Ensures user is logged in (via Supabase Auth)
 * - Fetches their record from your `users` table
 * - Optionally checks their role against allowed roles
 */
export async function authorized(requiredRoles?: Role | Role[]) {
    const supabase = await createClient();

    // 1. Get logged-in user from Supabase Auth
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) return null; // Not logged in

    // 2. Normalize requiredRoles → always an array
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    const { data: dbUser, error: dbError } = await supabase
        .from("users")
        .select(
            "*"
        )
        .eq("auth_id", user.id)
        .single();

    if (dbError || !dbUser) return null;

    // 4. Role check (optional)
    //    If `requiredRoles` was passed, only allow those roles.
    if (requiredRoles && !roles.includes(dbUser.role)) {
        return null; // Unauthorized
    }

    // 5. Return a merged object:
    //    - Everything from Supabase Auth (`user`)
    //    - Everything from your `users` table (`dbUser`)
    return {
        ...user,   // Supabase Auth fields (id, email, etc.)
        ...dbUser, // Your `users` table record (role, school_id, etc.)
    };
}
