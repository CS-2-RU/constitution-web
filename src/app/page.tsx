import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import RulesHomepage from "@/components/RulesHomepage/RulesHomepage";

export default async function HomePage() {
    const session = await auth()

    if (!session) {
        redirect('/auth')
    }

    const user = session.user as any

    if (user.role === 'DENIED') {
        redirect('/denied')
    }

    return (
        <RulesHomepage />
    )
}