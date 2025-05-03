import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

// Define JWT secret & cookie options
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const ReqToken = req.cookies.get("employeeToken")?.value;
    if (!ReqToken) {
      return NextResponse.json({
        message: "Token not found",
        success: false,
      });
    }

    const decoded: any = jwt.verify(ReqToken, JWT_SECRET);
    const email = decoded?.email;
    if (!email) {
      return NextResponse.json({
        message: "Invalid token",
        success: false,
      });
    }

    // Connect to DB and find user
    const client = await DBConnection();
    const DB = client.db("Employee").collection("users");
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

    const employeeToken = jwt.sign(tokenData, JWT_SECRET!, { expiresIn: "7d" });
    const response = NextResponse.json({
      message: "Token Generated",
      success: true,
      employeeToken: employeeToken,
      role: user?.role,
    });

    response.cookies.set("employeeToken", employeeToken, {
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
