import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import UserManagement from "@/components/UserManagement/UserManagement";
import Link from "next/link";

export default async function UsersPage() {
    const session = await auth()

    if (!session) {
        redirect('/auth')
    }

    const currentUser = session.user as any

    if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERADMIN') {
        redirect('/')
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            discordId: true,
            discordUsername: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <UserManagement
            users={users}
            currentUserRole={currentUser.role}
            currentUserId={currentUser.id}
        />
    )
}