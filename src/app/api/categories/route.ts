import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all categories
export async function GET() {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const categories = await prisma.category.findMany({
            orderBy: {
                index: 'asc'
            },
            include: {
                _count: {
                    select: { rules: true }
                }
            }
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// CREATE new category
export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUser = session.user as any

        if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { name, index } = await request.json()

        if (!name?.trim()) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
        }

        const existingCategory = await prisma.category.findUnique({
            where: { name: name.trim() }
        })

        if (existingCategory) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
        }

        const newCategory = await prisma.category.create({
            data: {
                name: name.trim(),
                index: index ?? 0
            }
        })

        return NextResponse.json(newCategory)
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}