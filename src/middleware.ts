// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const employeeToken = request.cookies.get("employeeToken")?.value;
  const userToken = request.cookies.get("userToken")?.value;
  const pathname = request.nextUrl.pathname;
  const publicPath = pathname === "/login" || pathname === "/signup";
  const userPublicPath =
    pathname === "/user/login" || pathname === "/user/register";
  if (!employeeToken && pathname.startsWith("/employee/dashboard")) {
    return NextResponse.redirect(new URL("/employee/login", request.url));
  }
  if (employeeToken) {
    const { payload } = await jwtVerify(
      employeeToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    const role = payload.role as string | undefined;
    if (pathname.startsWith("/employee/dashboard") && role === "employee") {
      return NextResponse.redirect(new URL("/employee/awaiting", request.url));
    }

    if (
      pathname.startsWith("/employee/awaiting") &&
      role === "approvedEmployee"
    ) {
      return NextResponse.redirect(new URL("/employee/dashboard", request.url));
    }

    if (publicPath && payload) {
      return NextResponse.redirect(new URL("/employee/dashboard", request.url));
    }
  }
  if (!employeeToken && pathname === "/employee/dashboard") {
    return NextResponse.redirect(new URL("/employee/login", request.url));
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
    "/employee/:path*",
    "/awaiting",
    "/login",
    "/signup",
    "/user/:path*",
  ],
};
