import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUser = session.user as any
        const currentUserRole = currentUser.role

        if (currentUserRole !== 'ADMIN' && currentUserRole !== 'SUPERADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { userId, newRole } = await request.json()

        if (!userId || !newRole) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Validate the new role
        const validRoles = ['DENIED', 'USER', 'ADMIN', 'SUPERADMIN']
        if (!validRoles.includes(newRole)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
        }

        // Get the target user
        const targetUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true, id: true }
        })

        if (!targetUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (currentUserRole === 'ADMIN') {
            // Admins can only:
            // - Change DENIED to USER or USER to DENIED
            // - Cannot modify other ADMIN or SUPERADMIN users

            if (targetUser.role === 'ADMIN' || targetUser.role === 'SUPERADMIN') {
                return NextResponse.json({ error: 'Cannot modify admin or superadmin users' }, { status: 403 })
            }

            if (newRole !== 'DENIED' && newRole !== 'USER') {
                return NextResponse.json({ error: 'Admins can only assign DENIED or USER roles' }, { status: 403 })
            }
        }
        // SUPERADMIN can modify anyone and assign any role (no restrictions)

        // Update the user role
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Error updating user role:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}