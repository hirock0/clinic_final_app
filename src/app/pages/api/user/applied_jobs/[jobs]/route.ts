import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET(req: NextRequest, res: any) {
  try {
    const { jobs } = await res.params;
    const client = await DBConnection();
    const jobsDB = client.db("Applied").collection("jobs");
    const allAppliedJobs = await jobsDB.find({ userEmail: jobs }).toArray();
    return NextResponse.json({
      message: "data found",
      success: true,
      allAppliedJobs,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
