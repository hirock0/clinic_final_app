import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET(req: NextRequest, res: any) {
  try {
    const client = await DBConnection();
    const applicationDB = client.db("unitedCare").collection("jobs");
    const allJobs = await applicationDB
      .find()
      .sort({ timeStamp: -1 })
      .toArray();
    return NextResponse.json({
      message: "All data got it!",
      success: true,
      allJobs: allJobs,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: true,
    });
  }
}
