import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const tokenData = {
      name: "Hirock",
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      token: token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
