import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email } = body

        if (!email) {
            return NextResponse.json({ exists: false })
        }

        // Check if user exists in database
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        })

        return NextResponse.json({ exists: !!user })
    } catch (error) {
        console.error('Error checking user:', error)
        return NextResponse.json({ exists: false })
    }
}