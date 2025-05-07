import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET(req: NextRequest, res: any) {
  try {
    const { jobs } = await res.params;
    if (jobs) {
      const client = await DBConnection();
      const applicationDB = client.db("UserApplication").collection("applications");
      const appliedJobs = await applicationDB
        .find({ userEmail: jobs, status: "applied" })
        .toArray();
      const acceptedJobs = await applicationDB
        .find({ userEmail: jobs, status: "accepted" })
        .toArray();
      const rejectedJobs = await applicationDB
        .find({ userEmail: jobs, status: "rejected" })
        .toArray();
      return NextResponse.json({
        message: "data fouJobnd",
        success: true,
        allApplications: { appliedJobs, acceptedJobs, rejectedJobs },
      });
    } else {
      return NextResponse.json({
        message: "data not found",
        success: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
