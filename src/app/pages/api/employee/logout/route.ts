import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    response.cookies.delete("employeeToken");
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: true,
    });
  }
}
