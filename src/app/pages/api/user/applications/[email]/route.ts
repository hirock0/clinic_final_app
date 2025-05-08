import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET(req: NextRequest, res: any) {
  try {
    const { email } = await res.params;
    if (email) {
      const client = await DBConnection();
      const applicationDB = client
        .db("UserApplication")
        .collection("applications");
      const appliedApplications = await applicationDB
        .find({ userEmail: email })
        .sort({
          timeStamp: -1,
        })
        .toArray();
      return NextResponse.json({
        message: "data fouJobnd",
        success: true,
        appliedApplications: appliedApplications,
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
