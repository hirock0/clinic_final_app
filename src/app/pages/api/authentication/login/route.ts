import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
  try {
    const client = await DBConnection();
    const userDB = client.db("AdminDB").collection("loggedUsers");
    const { email, password } = await request.json();

    const existingUser = await userDB.findOne({ email: email });

    if (!existingUser) {
      return NextResponse.json({
        message: "Email is not correct",
        success: false,
      });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser?.password
    );

    if (!verifyPassword) {
      return NextResponse.json({
        message: "Password is not correct",
        success: false,
      });
    }

    const tokenData = {
      name: existingUser?.name,
      email: existingUser?.email,
      image: existingUser?.image,
      role: existingUser?.role,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      token: token,
      role: existingUser?.role,
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
      message: error.message,
      success: false,
    });
  }
}
