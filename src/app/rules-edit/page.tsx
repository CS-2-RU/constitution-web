import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link";
import RulesManager from "@/components/RulesManager/RulesManager";

export default async function RulesEditPage() {
    const session = await auth()

    if (!session) {
        redirect('/auth')
    }

    const currentUser = session.user as any

    if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERADMIN') {
        redirect('/')
    }

    // Fetch all rules with categories
    const rules = await prisma.rule.findMany({
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
        },
        orderBy: [
            { category: { index: 'asc' } },
            { rule: 'asc' }
        ]
    })

    // Fetch all categories
    const categories = await prisma.category.findMany({
        orderBy: {
            index: 'asc'
        }
    })

    return (
        <>
            {/*// @ts-ignore*/}
            <RulesManager initialRules={rules} initialCategories={categories} />
        </>
    )
}