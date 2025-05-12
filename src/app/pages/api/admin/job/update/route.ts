import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { ObjectId } from "mongodb";
export async function POST(req: NextRequest) {
  try {
    const { jobId, ...rest } = await req.json();
    const id = new ObjectId(String(jobId));
    const client = await DBConnection();
    const applicationDB = client.db("unitedCare").collection("jobs");
    const findJob = await applicationDB.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...rest,
        },
      }
    );
    if (findJob) {
      return NextResponse.json({
        message: "Job updated",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Job not updated",
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
