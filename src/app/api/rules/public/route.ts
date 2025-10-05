import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = session.user as any

        if (user.role === 'DENIED') {
            return NextResponse.json({ error: 'Access denied' }, { status: 403 })
        }

        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search')

        let whereClause = {}

        if (search) {
            whereClause = {
                OR: [
                    { rule: { contains: search, mode: 'insensitive' } },
                    { name: { contains: search, mode: 'insensitive' } }
                ]
            }
        }

        const rules = await prisma.rule.findMany({
            where: whereClause,
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

        return NextResponse.json(rules)
    } catch (error) {
        console.error('Error fetching rules:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// GET all categories
export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = session.user as any

        if (user.role === 'DENIED') {
            return NextResponse.json({ error: 'Access denied' }, { status: 403 })
        }

        const categories = await prisma.category.findMany({
            orderBy: {
                index: 'asc'
            }
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}