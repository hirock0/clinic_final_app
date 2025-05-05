import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET(req: NextRequest, res: any) {
  try {
    const client = await DBConnection();
    const applicationDB = client.db("unitedCare").collection("jobs");
    const findunDisApprovedApplications = await applicationDB
      .find({
        approvedStatus: false,
      })
      .toArray();
    return NextResponse.json({
      message: "All data got it!",
      success: true,
      waitingForApproved:findunDisApprovedApplications
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: true,
    });
  }
}
