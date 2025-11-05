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

    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
        redirect(`/error?message=${encodeURIComponent(signUpError.message)}`);
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect(`/error?message=${encodeURIComponent("Sign up successful, but failed to retrieve user session. Please log in.")}`);
    }

    //CRITICAL: Insert corresponding record to public.users table.
    const username = generateUsername(email);
    const displayname = `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`;

    const { error: dbInsertError } = await supabase
        .from('users')
        .insert({
            auth_id: user.id,
            email: email,
            role: role,
            school_id: 1, //TESTING
            username: username,
            displayname: displayname,
        });

    if (dbInsertError) {
        console.error("Database insert failed:", dbInsertError);
        redirect(`/error?message=${encodeURIComponent("Account created, but database record failed. Check server logs.")}`);
    }

    revalidatePath('/', 'layout')
    redirect('/school')
}