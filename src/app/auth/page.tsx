"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp() {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) console.error(error.message);
        else console.log("User signed up:", data);
    }

    async function handleSignIn() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) console.error(error.message);
        else console.log("User signed in:", data);
    }

    return (
        <div className="flex flex-col gap-3">
            <input
                type="email"
                placeholder="Email"
                className="border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}
