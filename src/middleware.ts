// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      const role = payload.role as string | undefined;

      if (pathname.startsWith("/dashboard") && role === "employee") {
        return NextResponse.redirect(new URL("/awaiting", request.url));
      }

      if (pathname.startsWith("/awaiting") && role === "approvedEmployee") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/awaiting", "/login"], // allow nested dashboard routes too
};
