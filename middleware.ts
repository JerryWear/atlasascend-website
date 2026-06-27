import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase-middleware'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient(request, response)

  // Refresh session — always needed for @supabase/ssr
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Allow login page through without check
  if (pathname === '/admin/login') {
    // If already logged in, redirect to dashboard
    if (session) {
      const { data } = await supabase
        .from('website_admins')
        .select('email')
        .eq('email', session.user.email!)
        .single()
      if (data) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }
    return response
  }

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verify the user is in website_admins table
    const { data } = await supabase
      .from('website_admins')
      .select('email')
      .eq('email', session.user.email!)
      .single()

    if (!data) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
  ],
}
