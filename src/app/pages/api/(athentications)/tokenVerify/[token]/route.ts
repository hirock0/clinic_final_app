import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest, res: any) {
  try {
    const { token } = await res?.params;
    const verify = jwt.verify(token, process.env.JWT_SECRET!);
    if (!verify) {
      return NextResponse.json({
        message: "Token",
        success: false,
      });
    } else {
      return NextResponse.json({
        message: "Token",
        success: true,
        user: verify,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
