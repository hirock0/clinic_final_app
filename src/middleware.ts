import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Verify JWT token
async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("JWT verification failed:", error);
    }
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("token")?.value || "";
  const url = request.nextUrl.clone();
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
  }
  if (token) {
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
    }

    const role = payload?.role;

    if (role === "institutional" && isPublic(institutionalPublicPaths)) {
      const redirectTo =
        request.nextUrl.searchParams.get("redirectTo") ||
        "/institutional/dashboard";
      return NextResponse.redirect(redirectTo);
    }

    if (role !== "institutional" && isHireTalentPath) {
      url.pathname = "/institutional/login";
      return NextResponse.redirect(url);
    }

    if (role === "user" && isPublic(userPublicPaths)) {
      const redirectTo =
        request.nextUrl.searchParams.get("redirectTo") || "/user/dashboard";
      return NextResponse.redirect(redirectTo);
    }

    if (role === "admin" && isPublic(adminPublicPaths)) {
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    if (role === "employee" && isPublic(employeePublicPaths)) {
      url.pathname = "/employee/awaiting";
      return NextResponse.redirect(url);
    }
    if (
      role === "approvedEmployee" &&
      isEmployeePath &&
      !isPublic(employeePublicPaths) &&
      pathname !== "/employee/dashboard"
    ) {
      url.pathname = "/employee/dashboard";
      return NextResponse.redirect(url);
    }

    if (
      role === "employee" &&
      isEmployeePath &&
      !isPublic(employeePublicPaths) &&
      pathname !== "/employee/awaiting"
    ) {
      url.pathname = "/employee/awaiting";
      return NextResponse.redirect(url);
    }
  }
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
