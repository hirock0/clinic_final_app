import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { ObjectId } from "mongodb";
export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const Id = new ObjectId(String(id));
    const client = await DBConnection();
    const applicationDB = client.db("unitedCare").collection("jobs");
    const findJob = await applicationDB.updateOne(
      {
        _id: Id,
      },
      {
        $set: {
          approvedStatus: true,
          newTimeStamp: new Date(),
          newAdminPost: new Date().toDateString(),
        },
      }
    );
    if (findJob) {
      return NextResponse.json({
        message: "Approved successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Not Approved",
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
