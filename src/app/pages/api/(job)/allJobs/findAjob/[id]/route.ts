import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { ObjectId } from "mongodb";
export async function GET(req: NextRequest, res: any) {
  try {
    const { id } = await res.params;
    const client = await DBConnection();
    const applicationDB = client.db("unitedCare").collection("jobs");
    const findJob = await applicationDB.findOne({
      _id: new ObjectId(String(id)),
    });
    if (findJob) {
      return NextResponse.json({
        message: "Job got it",
        success: true,
        job: findJob,
      });
    } else {
      return NextResponse.json({
        message: "Job not got it",
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
