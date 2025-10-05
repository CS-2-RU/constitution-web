import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// UPDATE category
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUser = session.user as any

        if (currentUser.role !== 'SUPERADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { id } = await params // Await params here
        const { name, index } = await request.json()

        if (!name?.trim()) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id }
        })

        if (!existingCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }

        const conflictingCategory = await prisma.category.findUnique({
            where: { name: name.trim() }
        })

        if (conflictingCategory && conflictingCategory.id !== id) {
            return NextResponse.json({ error: 'Category name already exists' }, { status: 400 })
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: name.trim(),
                index: index ?? existingCategory.index
            }
        })

        return NextResponse.json(updatedCategory)
    } catch (error) {
        console.error('Error updating category:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE category
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUser = session.user as any

        if (currentUser.role !== 'SUPERADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { id } = await params // Await params here

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { rules: true }
                }
            }
        })

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }

        if (category._count.rules > 0) {
            return NextResponse.json({
                error: 'Cannot delete category with existing rules'
            }, { status: 400 })
        }

        await prisma.category.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}