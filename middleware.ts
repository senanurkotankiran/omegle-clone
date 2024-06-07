import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJwtToken } from './lib/auth';
import { NextURL } from 'next/dist/server/web/next-url';


const AUTH_PAGES = ['/user/login' , '/user/register']

const isAuthPages =(url)=> AUTH_PAGES.some(page=>page.startsWith(url))


 
export async function middleware(request: NextRequest) {
    const {url, nextUrl, cookies} = request
    const {value: token} = cookies.get("token") ?? {value : null}


    const hasVerifiedToken = token && await verifyJwtToken(token);
    const isAuthPageRequested =  isAuthPages(nextUrl.pathname);
    
    if (isAuthPageRequested) {
        if (!hasVerifiedToken) {
            const response = NextResponse.next()
            return response;
        }

        const response = NextResponse.redirect(new URL('/', request.url))
        return response;

    }


    if (!hasVerifiedToken) {
        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set("next" , nextUrl.pathname)
        return NextResponse.redirect(new URL(`/user/login?${searchParams}`, request.url))
    }
    return NextResponse.next();
}
 
export const config = {
  matcher: ['/panel/:path*', '/user/login']
}