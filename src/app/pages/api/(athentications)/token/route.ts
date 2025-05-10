import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const token = req?.cookies.get("token")?.value || "";
    return NextResponse.json({
      message: "Yoken decoded",
      success: true,
      token: token,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
