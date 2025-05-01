import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  try {
    const employeeToken = req?.cookies.get("employeeToken")?.value || "";
    const decodedUser = jwt.verify(employeeToken, process.env.JWT_SECRET!);
    return NextResponse.json({
      message: "Yoken decoded",
      success: true,
      employee: decodedUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
