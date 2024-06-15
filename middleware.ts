// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const AUTH_PAGES = ['/admin/user/login']
const isAuthPages = (url: string) => AUTH_PAGES.some(page => page.startsWith(url))

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request as any, secret: process.env.JWT_SECRET_KEY })
    const { nextUrl } = request
    const isAuthPageRequested = isAuthPages(nextUrl.pathname)

    if (isAuthPageRequested) {
        if (!token) {
            const response = NextResponse.next()
            return response
        }
        const response = NextResponse.redirect(new URL('/admin/panel', request.url))
        return response
    }

    if (!token) { 
        const searchParams = new URLSearchParams(nextUrl.searchParams)
        searchParams.set('next', nextUrl.pathname)
        return NextResponse.redirect(new URL(`/admin/user/login?${searchParams}`, request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/admin/user/login']
}
