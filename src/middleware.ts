// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userToken = request.cookies.get("userToken")?.value;
  const pathname = request.nextUrl.pathname;
  const publicPath = pathname === "/login" || pathname === "/signup";
  const userPublicPath =
    pathname === "/user/login" || pathname === "/user/register";
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token) {
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

    if (publicPath && payload) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  if (!token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userToken) {
    const { payload } = await jwtVerify(
      userToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    if (payload && userPublicPath) {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }
  if (!userToken && pathname === "/user/dashboard") {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/awaiting",
    "/login",
    "/signup",
    "/user/:path*",
  ],
};
