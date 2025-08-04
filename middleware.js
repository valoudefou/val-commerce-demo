// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  console.log('🔍 Middleware checking:', url.pathname);

  // Check if the URL ends with "-new" (e.g., /products/123-new)
  if (url.pathname.match(/\/products\/\d+-new$/)) {
    console.log('✅ Matched -new pattern:', url.pathname);
    
    // Extract the ID by removing "-new" from the end
    const id = url.pathname.replace(/\/products\/(\d+)-new$/, '$1');
    console.log('📝 Extracted ID:', id);

    // Rewrite to your [id]-new.js page
    url.pathname = `/products/${id}-new`;
    console.log('🔄 Rewriting to:', url.pathname);

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/products/:path*',
};
