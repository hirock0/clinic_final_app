import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const VerifyToken = async (): Promise<any | null> => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload as any;
  } catch (error) {
    return null;
  }
};

export const AllJobs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/allJobs`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    return [];
  }
};

export const FindAJob = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/allJobs/findAjob/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const FindUserApplications = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/user/applications/${email}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    return null;
  }
};
export const FindInstitutionalJobs = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/institutional/appliedJobs/${email}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    return null;
  }
};
export const FindAllApplications = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/admin/allApplications`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const VerifiedToken = async (data: any) => {
  try {
    const token = data;
    if (!token) return null;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    if (payload) {
      return payload as any;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const AllEmployees = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/admin/employees`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    return null;
  }
};