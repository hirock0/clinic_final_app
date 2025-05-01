import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  try {
    const userToken = req?.cookies.get("userToken")?.value || "";
    const decodedUser = jwt.verify(userToken, process.env.JWT_SECRET!);
    return NextResponse.json({
      message: "Yoken decoded",
      success: true,
      user: decodedUser,
    });
    
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
