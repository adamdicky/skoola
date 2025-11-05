import { login, signup } from "./actions"

export default function LoginPage() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />

            {/* 🟢 START: Temporary role selection for testing */}
            <label htmlFor="role">Sign up as:</label>
            <select id="role" name="role" required>
                <option value="">-- Select Role (Test Only) --</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
            </select>
            {/* 🟢 END: Temporary role selection */}

            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>


        </form>
    )
}