import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error:any) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(error.message)
    }
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname.replace(/\/$/, "");
  const search = url.search;

  const token = request.cookies.get("token")?.value || "";

  const isEmployeePath = pathname.startsWith("/employee");
  const isUserPath = pathname.startsWith("/user");
  const isInstitutionalPath = pathname.startsWith("/institutional");
  const isAdminPath = pathname.startsWith("/admin");
  const isHireTalentPath = pathname.startsWith("/hire-talent");

  const employeePublicPaths = ["/employee/login", "/employee/register"];
  const adminPublicPaths = ["/admin/login", "/admin/register"];
  const userPublicPaths = ["/user/login", "/user/register"];
  const institutionalPublicPaths = [
    "/institutional/login",
    "/institutional/register",
  ];

  const isPublic = (pathArray: string[]) => pathArray.includes(pathname);
  const redirectWithReturn = (path: string) => {
    url.pathname = path;
    url.searchParams.set("redirectTo", pathname + (search || ""));
    return NextResponse.redirect(url);
  };

  if (!token) {
    if (isInstitutionalPath && !isPublic(institutionalPublicPaths)) {
      return redirectWithReturn("/institutional/login");
    }
    if (isUserPath && !isPublic(userPublicPaths)) {
      return redirectWithReturn("/user/login");
    }
    if (isAdminPath && !isPublic(adminPublicPaths)) {
      return redirectWithReturn("/admin/login");
    }
    if (isEmployeePath && !isPublic(employeePublicPaths)) {
      return redirectWithReturn("/employee/login");
    }
    if (isHireTalentPath) {
      return redirectWithReturn("/institutional/login");
    }
    return NextResponse.next();
  }

  const payload: any = await verifyToken(token);

  if (!payload) {
    if (isInstitutionalPath && !isPublic(institutionalPublicPaths)) {
      return redirectWithReturn("/institutional/login");
    }
    if (isUserPath && !isPublic(userPublicPaths)) {
      return redirectWithReturn("/user/login");
    }
    if (isAdminPath && !isPublic(adminPublicPaths)) {
      return redirectWithReturn("/admin/login");
    }
    if (isEmployeePath && !isPublic(employeePublicPaths)) {
      return redirectWithReturn("/employee/login");
    }
    if (isHireTalentPath) {
      return redirectWithReturn("/institutional/login");
    }
    return NextResponse.next();
  }

  const role = payload?.role;

  if (role === "institutional" && isPublic(institutionalPublicPaths)) {
    const redirectTo =
      request.nextUrl.searchParams.get("redirectTo") ||
      "/institutional/dashboard";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (role === "user" && isPublic(userPublicPaths)) {
    const redirectTo =
      request.nextUrl.searchParams.get("redirectTo") || "/user/dashboard";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (role === "admin" && isPublic(adminPublicPaths)) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  if (role !== "admin" && !isPublic(adminPublicPaths) && isAdminPath) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (role === "employee" && isPublic(employeePublicPaths)) {
    return NextResponse.redirect(new URL("/employee/awaiting", request.url));
  }

  if (
    role === "approvedEmployee" &&
    isPublic(employeePublicPaths) &&
    pathname !== "/employee/dashboard"
  ) {
    return NextResponse.redirect(new URL("/employee/dashboard", request.url));
  }

  if (
    role === "employee" &&
    isEmployeePath &&
    !isPublic(employeePublicPaths) &&
    pathname !== "/employee/awaiting"
  ) {
    return NextResponse.redirect(new URL("/employee/awaiting", request.url));
  }

  if ((role === "institutional" || role === "admin") && isHireTalentPath) {
    return NextResponse.next();
  }
  if (role !== "institutional" && role !== "admin" && isHireTalentPath) {
    return NextResponse.redirect(new URL("/institutional/login", request.url));
  }

  if (role !== "user" && pathname.startsWith("/user")) {
    return NextResponse.redirect(
      new URL(
        `/${role === "approvedEmployee" ? "employee" : role}/dashboard`,
        request.url
      )
    );
  }
  if (role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(
      new URL(
        `/${role === "approvedEmployee" ? "employee" : role}/dashboard`,
        request.url
      )
    );
  }

  if (role !== "approvedEmployee" && pathname.startsWith("/employee")) {
    return NextResponse.redirect(
      new URL(
        `/${role === "approvedEmployee" ? "employee" : role}/dashboard`,
        request.url
      )
    );
  }
  if (role !== "institutional" && pathname.startsWith("/institutional")) {
    return NextResponse.redirect(
      new URL(
        `/${role === "approvedEmployee" ? "employee" : role}/dashboard`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/employee/:path*",
    "/user/:path*",
    "/hire-talent",
    "/institutional/:path*",
    "/admin/:path*",
  ],
};
