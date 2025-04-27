import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // ✅ যদি dashboard চাও কিন্তু token না থাকে, login page এ redirect
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ যদি login চাও কিন্তু token already থাকে, dashboard এ redirect
  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ আর বাকি কেসে request proceed হোক normally
  return NextResponse.next();
}

// ❌ config spelling ভুল ছিলো
export const config = {
  matcher: ["/dashboard", "/login"],
};
