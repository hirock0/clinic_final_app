import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET() {
  try {
    const client = await DBConnection();
    const users = await client
      .db("Employee")
      .collection("users")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({
      message: "all employees got it",
      success: true,
      users,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
