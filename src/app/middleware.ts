import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

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
}
