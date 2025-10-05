import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl

    // Public routes that don't require authentication
    const publicRoutes = ['/auth']

    // Routes that require authentication
    const protectedRoutes = ['/', '/users']

    // Admin routes
    const adminRoutes = ['/users', '/rules-edit']

    // Allow public routes without any checks
    if (publicRoutes.some(route => pathname.startsWith(route))) {
        // If authenticated user tries to access auth page, redirect to homepage
        if (session) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    // If user has a session, verify they still exist in the database
    if (session?.user?.email) {
        try {
            const userExists = await prisma.user.findUnique({
                where: { email: session.user.email },
                select: { id: true }
            })

            // If user doesn't exist (was deleted), sign them out
            if (!userExists) {
                const response = NextResponse.redirect(new URL('/auth', request.url))
                // Clear session cookies
                response.cookies.delete('authjs.session-token')
                response.cookies.delete('__Secure-authjs.session-token')
                return response
            }
        } catch (error) {
            console.error('Error checking user existence:', error)
            // On error, allow request to continue to avoid breaking the site
        }
    }

    // If trying to access a protected route without authentication
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !session) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    // If authenticated, check role-based access
    if (session) {
        const userRole = (session.user as any)?.role

        // If user role is DENIED, only allow access to /denied
        if (userRole === 'DENIED' && pathname !== '/denied') {
            return NextResponse.redirect(new URL('/denied', request.url))
        }

        // If user role is not DENIED and they try to access /denied, redirect to homepage
        if (userRole !== 'DENIED' && pathname === '/denied') {
            return NextResponse.redirect(new URL('/', request.url))
        }

        // Check admin routes access
        if (adminRoutes.some(route => pathname.startsWith(route))) {
            if (userRole !== 'ADMIN' && userRole !== 'SUPERADMIN') {
                return NextResponse.redirect(new URL('/', request.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)'],
    runtime: 'nodejs',
}