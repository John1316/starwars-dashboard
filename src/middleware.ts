// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the domain from the request headers
  const hostname = request.headers.get('host') || 'unknown';
  
  // Get the full URL
  const url = request.url;
  
  // Get the origin (protocol + domain)
  const origin = request.headers.get('origin') || 'unknown';
  
  // Log the information
  console.log({
    timestamp: new Date().toISOString(),
    hostname,
    url,
    origin,
    path: request.nextUrl.pathname,
    method: request.method,
  });
  
  // You could also send this to a logging service or database here
  
  // Continue with the request - don't modify anything
  return NextResponse.next();
}

// Configure which paths this middleware will run on
// This will run on all paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};