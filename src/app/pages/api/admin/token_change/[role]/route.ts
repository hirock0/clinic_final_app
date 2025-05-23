import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
export async function GET(req: NextRequest, res: any) {
  try {
    const { role } = await res?.params;
    const reqToken = req.cookies.get("token")?.value;
    if (!reqToken) {
      return NextResponse.json({
        message: "Token not found",
        success: false,
      });
    }
    const decoded: any = jwt.verify(reqToken, JWT_SECRET);
    const email = decoded?.email;
    if (!email) {
      return NextResponse.json({
        message: "Invalid token",
        success: false,
      });
    }
    const client = await DBConnection();
    const DB = client.db("AllUsers").collection(role);
    const user = await DB.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        message: "user not found",
        success: false,
      });
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
