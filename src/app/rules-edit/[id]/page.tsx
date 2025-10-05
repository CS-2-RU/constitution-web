import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import RuleEditor from "@/components/RuleEditor/RuleEditor";

export default async function RuleEditPage({ params }: { params: { id: string } }) {
    const session = await auth()

    if (!session) {
        redirect('/auth')
    }

    const currentUser = session.user as any

    if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERADMIN') {
        redirect('/')
    }

    // Fetch the specific rule
    const rule = await prisma.rule.findUnique({
        where: { id: params.id },
        include: {
            category: true,
            punishments: {
                include: {
                    actions: true
                },
                orderBy: {
                    index: 'asc'
                }
            }
        }
    })

    if (!rule) {
        notFound()
    }

    // Fetch all categories for the dropdown
    const categories = await prisma.category.findMany({
        orderBy: {
            index: 'asc'
        }
    })

    return (
        <RuleEditor rule={rule} categories={categories} />
    )
}