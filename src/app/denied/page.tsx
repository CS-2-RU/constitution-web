import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DeniedPage() {
    const session = await auth()

    if (!session) {
        redirect('/auth')
    }

    const user = session.user as any

    if (user.role !== 'DENIED') {
        redirect('/')
    }

    return (
        <div>
            <h1>Access Denied</h1>
            <p>Your account is pending approval. Please wait for an administrator to approve your access.</p>
            <p>User: {user.name || user.email}</p>
            <p>Status: {user.role}</p>

            {/*<button onClick={() => window.location.reload()}>*/}
            {/*    Refresh Page*/}
            {/*</button>*/}

            <form
                action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/auth" })
                }}
            >
                <button type="submit">
                    Sign out
                </button>
            </form>
        </div>
    )
}