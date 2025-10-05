import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {auth} from "@/lib/auth";

export async function DELETE(request: Request) {
    try {
        const session = await auth()

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, role: true }
        })

        if (!currentUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Check if user has permission to delete users
        if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERADMIN') {
            return NextResponse.json(
                { error: 'Insufficient permissions' },
                { status: 403 }
            )
        }

        // Parse request body
        const body = await request.json()
        const { userId } = body

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            )
        }

        // Prevent self-deletion
        if (userId === currentUser.id) {
            return NextResponse.json(
                { error: 'You cannot delete yourself' },
                { status: 400 }
            )
        }

        // Get target user
        const targetUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, email: true }
        })

        if (!targetUser) {
            return NextResponse.json(
                { error: 'Target user not found' },
                { status: 404 }
            )
        }

        // Check permissions based on roles
        if (currentUser.role === 'ADMIN') {
            // Admins can only delete DENIED and USER roles
            if (targetUser.role === 'ADMIN' || targetUser.role === 'SUPERADMIN') {
                return NextResponse.json(
                    { error: 'Admins cannot delete other admins or superadmins' },
                    { status: 403 }
                )
            }
        }

        // SUPERADMIN can delete anyone (except themselves, already checked)

        // Delete user (cascade will handle related records based on Prisma schema)
        await prisma.user.delete({
            where: { id: userId }
        })

        return NextResponse.json(
            {
                success: true,
                message: `User ${targetUser.email} has been deleted`
            },
            { status: 200 }
        )

    } catch (error) {
        console.error('Error deleting user:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}