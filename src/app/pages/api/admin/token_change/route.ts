import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import jwt from "jsonwebtoken";

// Define JWT secret & cookie options
const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax",
};

export async function GET(req: NextRequest) {
  try {
    const ReqToken = req.cookies.get("token")?.value;
    if (!ReqToken) {
      throw new Error("Token not found");
    }

    const decoded: any = jwt.verify(ReqToken, JWT_SECRET);
    const email = decoded?.email;
    if (!email) {
      throw new Error("Invalid token");
    }

    // Connect to DB and find user
    const client = await DBConnection();
    const DB = client.db("AdminDB").collection("loggedUsers");
    const user = await DB.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    const tokenData = {
      name: user?.name,
      email: user?.email,
      image: user?.image,
      role: user?.role,
    };

    const token = jwt.sign(tokenData, JWT_SECRET!, { expiresIn: "7d" });
    const response = NextResponse.json({
      message: "Token Generated",
      success: true,
      token: token,
      role: user?.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}
