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

    // 🟢 DEBUG CHECKPOINT 1: See if session was retrieved
    if (error) {
        console.error("[AUTH ERROR] Supabase Auth Session Failed:", error.message);
        return null; // Not logged in
    }
    if (!user) {
        console.warn("[AUTH WARN] No user session found. Returning unauthorized.");
        return null; // Not logged in
    }
    // console.log("[AUTH DEBUG] User Session Retrieved. User ID:", user.id);

    // if (error || !user) return null; // Not logged in

    // 2. Normalize requiredRoles → always an array
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    const { data: dbUser, error: dbError } = await supabase
        .from("users")
        .select(
            "*"
        )
        .eq("auth_id", user.id)
        .single();

    // 🟢 DEBUG CHECKPOINT 2: See if DB lookup failed
    if (dbError) {
        console.error("[AUTH ERROR] Failed to fetch user from public.users:", dbError);
        return null; // DB lookup failed
    }
    if (!dbUser) {
        console.warn("[AUTH WARN] User exists in Auth but not in public.users. ID:", user.id);
        return null;
    }
    // console.log("[AUTH DEBUG] DB Profile Retrieved. Role:", dbUser.role);

    // if (dbError || !dbUser) return null;

    // 4. Role check (optional)
    //    If `requiredRoles` was passed, only allow those roles.
    if (requiredRoles && !roles.includes(dbUser.role)) {
        console.warn(`[AUTH WARN] Role check failed. User role: ${dbUser.role}. Required roles: ${requiredRoles}`);
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
