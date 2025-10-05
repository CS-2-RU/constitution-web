import { signIn } from "@/lib/auth"
import styles from './index.module.css';

export default function AuthPage() {
    return (
        <div className={styles.container}>
            <form
                action={async () => {
                    "use server"
                    await signIn("discord", { redirectTo: "/" })
                }}
            >
                <button type="submit" className={styles.button}>
                    Login with Discord
                    <img src="/discord.svg" alt="discord"/>
                </button>
            </form>
        </div>
    )
}