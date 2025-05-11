import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request?.json();
    console.log(reqBody);
    // const client = await DBConnection();
    // const users = await client
    //   .db("AllUsers")
    //   .collection("employee")

    return NextResponse.json({
      message: "Delete successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
