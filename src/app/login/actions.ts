// src/app/login/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

const generateUsername = (email: string) => {
    const parts = email.split('@');
    return parts[0].toLowerCase().replace(/[^a-z0-9]/g, '');
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/school')
}

export async function signup(formData: FormData) {

    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as "teacher" | "admin";

    if (!role) {
        redirect(`/error?message=${encodeURIComponent("Role selection is required for testing.")}`);
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
        redirect(`/error?message=${encodeURIComponent(signUpError.message)}`);
    }

    const user = signUpData.user;

    if (!user) {
        // IMPORTANT: This block confirms email confirmation is needed.
        return redirect(`/error?message=${encodeURIComponent("Sign up successful. Please check your email to confirm your account before logging in. NOTE: For quick testing, disable Email Confirmation in your Supabase Auth settings.")}`);
    }

    // CRITICAL: Prepare data for public.users insert with conditional assignment
    const username = generateUsername(email);
    const displayname = `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`;

    // Base payload for database insertion
    const dbPayload: { [key: string]: any } = {
        auth_id: user.id,
        email: email,
        role: role,
        school_id: 1, // TESTING: Assumes school ID 1 exists
        username: username,
        displayname: displayname,
    };

    if (role === 'teacher') {
        // ⚠️ HARDCODED FOR TESTING: Assign a placeholder Class ID for teacher role validation
        dbPayload.class_id = 1;
        dbPayload.club_id = null; // Ensure only one is assigned
    }

    const { error: dbInsertError } = await supabase
        .from('users')
        .insert(dbPayload);

    if (dbInsertError) {
        console.error("Database insert failed:", dbInsertError);
        redirect(`/error?message=${encodeURIComponent("Account created, but database record failed. Check server logs or verify school_id 1/class_id 1 exists.")}`);
    }

    revalidatePath('/', 'layout')
    redirect('/school')
}