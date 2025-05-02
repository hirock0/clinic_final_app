import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const client = await DBConnection();
    const jobsDB = client.db("Applied").collection("jobs");
    const findJob = await jobsDB.findOne({
      jobId: reqBody?.jobId,
    });
    if (findJob) {
      return NextResponse.json({
        message: "You have already applied",
        success: true,
      });
    } else {
      const savedJod = await jobsDB.insertOne(reqBody);
      if (savedJod?.insertedId) {
        return NextResponse.json({
          message: "Job apply successfully",
          success: true,
        });
      } else {
        return NextResponse.json({
          message: "Job apply not successfully",
          success: false,
        });
      }
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
