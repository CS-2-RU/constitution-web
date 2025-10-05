import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import styles from './../auth/index.module.css';

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
        <div className={styles.container}>

            <h1>Wait For Access To Be Granted</h1>
            <p>Your account is pending approval. Please wait for an administrator to approve your access.</p>
            <p>User: {user.name || user.email}</p>
        </div>
    )
}