import { signIn } from "@/lib/auth"

export default function AuthPage() {
    return (
        <div>
            <h1>Login</h1>
            <p>Please sign in to access the application.</p>

            <form
                action={async () => {
                    "use server"
                    await signIn("discord", { redirectTo: "/" })
                }}
            >
                <button type="submit">
                    Login with Discord
                </button>
            </form>
        </div>
    )
}