import styles from './index.module.css'
import {auth, signOut} from "@/lib/auth";
import {redirect} from "next/navigation";
import Link from "next/link";

const Header = async () => {
    const session = await auth()

    let user = null;

    if (!session) {

    } else {
        user = session.user as any
    }

    return (
        <header className={styles.container}>
            <Link href={'/'} className={styles.left}>
                <img src="/logo.gif" alt="logo" />
                CS 2 RU
            </Link>

            <div className={styles.right}>
                {user ? (
                    <>
                        {(user.role === 'ADMIN') && (
                            <div className={styles.links}>
                                <Link className={styles.link + ' ' + styles.button} href="/users">Manage Users</Link>
                            </div>
                        )}
                        {(user.role === 'SUPERADMIN') && (
                            <div className={styles.links}>
                                <Link className={styles.link + ' ' + styles.button} href="/users">Manage Users</Link>
                                <Link className={styles.link + ' ' + styles.button} href="/rules-edit">Manage Rules</Link>
                            </div>
                        )}
                        <div className={styles.data}>
                            <span className={styles.username}>{user.name || user.email}</span>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut({ redirectTo: "/auth" })
                                }}
                            >
                                <button className={styles.out + ' ' + styles.button} type="submit">
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>
        </header>
    )
}

export default Header;