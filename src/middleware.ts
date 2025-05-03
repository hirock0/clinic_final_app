// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const employeeToken = request.cookies.get("employeeToken")?.value;
  const userToken = request.cookies.get("userToken")?.value;
  const institutionalToken = request.cookies.get("institutionalToken")?.value;

  const isEmployeePath = pathname.startsWith("/employee");
  const isUserPath = pathname.startsWith("/user");
  const isInstitutionalPath = pathname.startsWith("/institutional");
  const isHireTalentPath = pathname.startsWith("/hire-talent");

  const employeePublicPaths = ["/employee/login", "/employee/register"];
  const userPublicPaths = ["/user/login", "/user/register"];
  const institutionalPublicPaths = [
    "/institutional/login",
    "/institutional/register",
  ];

  if (isEmployeePath) {
    const isPublic = employeePublicPaths.includes(pathname);

    if (!employeeToken && !isPublic) {
      return NextResponse.redirect(new URL("/employee/login", request.url));
    }

    if (employeeToken) {
      const payload = await verifyToken(employeeToken);
      if (!payload) {
        return NextResponse.redirect(new URL("/employee/login", request.url));
      }

      const role = payload.role as string;

      if (pathname.startsWith("/employee/dashboard") && role === "employee") {
        return NextResponse.redirect(new URL("/employee/awaiting", request.url));
      }
      if (pathname.startsWith("/employee/awaiting") && role === "approvedEmployee") {
        return NextResponse.redirect(new URL("/employee/dashboard", request.url));
      }

      if (isPublic) {
        return NextResponse.redirect(new URL("/employee/dashboard", request.url));
      }
    }
  }

  if (isUserPath) {
    const isPublic = userPublicPaths.includes(pathname);
    const loginUrl = new URL("/user/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname + search);

    if (!userToken && !isPublic) {
      return NextResponse.redirect(loginUrl);
    }

    if (userToken) {
      const payload = await verifyToken(userToken);
      if (!payload) {
        return NextResponse.redirect(loginUrl);
      }

      if (isPublic) {
        const redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/user/dashboard";
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
    }
  }


  if (isHireTalentPath) {
    const loginUrl = new URL("/institutional/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname + search);

    if (!institutionalToken) {
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(institutionalToken);
    if (!payload) {
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (isInstitutionalPath) {
    const isPublic = institutionalPublicPaths.includes(pathname);
    const redirectUrl =
      request.nextUrl.searchParams.get("redirectTo") || "/institutional/dashboard";

    if (!institutionalToken && !isPublic) {
      return NextResponse.redirect(new URL("/institutional/login", request.url));
    }

    if (institutionalToken && isPublic) {
      const payload = await verifyToken(institutionalToken);
      if (payload) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/employee/:path*",
    "/user/:path*",
    "/hire-talent",
    "/institutional/:path*",
  ],
};
