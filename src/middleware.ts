// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const employeeToken = request.cookies.get("employeeToken")?.value;
  const userToken = request.cookies.get("userToken")?.value;
  const institutionalToken = request.cookies.get("institutionalToken")?.value;
  const { pathname, search } = request.nextUrl;

  const employeePublicPath =
    pathname === "/employee/login" || pathname === "/employee/register";
  const userPublicPath =
    pathname === "/user/login" || pathname === "/user/register";
  const institutionalPublicPath =
    pathname === "/institutional/login" ||
    pathname === "/institutional/register";
  // Handle Employee Auth
  if (pathname.startsWith("/employee")) {
    if (!employeeToken && !employeePublicPath) {
      return NextResponse.redirect(new URL("/employee/login", request.url));
    }
    if (employeeToken) {
      const { payload } = await jwtVerify(
        employeeToken,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      const role = payload.role as string | undefined;

      if (pathname.startsWith("/employee/dashboard") && role === "employee") {
        return NextResponse.redirect(
          new URL("/employee/awaiting", request.url)
        );
      }

      if (
        pathname.startsWith("/employee/awaiting") &&
        role === "approvedEmployee"
      ) {
        return NextResponse.redirect(
          new URL("/employee/dashboard", request.url)
        );
      }

      if (employeePublicPath) {
        return NextResponse.redirect(
          new URL("/employee/dashboard", request.url)
        );
      }
    }
  }
  // Handle User Auth
  if (pathname.startsWith("/user")) {
    const loginUrl = new URL("/user/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname + search);
    if (!userToken && !userPublicPath) {
      return NextResponse.redirect(loginUrl);
    }

    if (userToken && userPublicPath) {
      try {
        const { payload } = await jwtVerify(
          userToken,
          new TextEncoder().encode(process.env.JWT_SECRET!)
        );

        if (payload) {
          const redirectUrl =
            request.nextUrl.searchParams.get("redirectTo") || "/user/dashboard";
          return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
      } catch (error) {
        // Token verification failed, redirect to login again
        return NextResponse.redirect(loginUrl);
      }
    }
  }
  // --------------------------
  // hiretalent_handler
  if (pathname.startsWith("/hire-talent")) {
    const loginUrl = new URL("/institutional/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname + search);
    if (!institutionalToken) {
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
  }

  // --------------------------------
  // institutional_handler
  if (pathname.startsWith("/institutional")) {
    const redirectUrl =
      request.nextUrl.searchParams.get("redirectTo") || "/institutional/login";
    if (!institutionalToken && !institutionalPublicPath) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    // if (institutionalToken && institutionalPublicPath) {
    //   return NextResponse.redirect(
    //     new URL("/institutional/dashboard", request.url)
    //   );
    // }
  }
  return NextResponse.next();
}

// Match all routes under /employee and /user
export const config = {
  matcher: [
    "/employee/:path*",
    "/user/:path*",
    "/hire-talent",
    "/institutional/:path*",
  ],
};
