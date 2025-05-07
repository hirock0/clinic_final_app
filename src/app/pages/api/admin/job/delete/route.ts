import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { ObjectId } from "mongodb";
export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const Id = new ObjectId(String(id));
    const client = await DBConnection();
    const applicationDB = client.db("unitedCare").collection("jobs");
    const deleteJob = await applicationDB.findOneAndDelete({ _id: Id });
    if (deleteJob) {
      return NextResponse.json({
        message: "Delete successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Not Delete",
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
