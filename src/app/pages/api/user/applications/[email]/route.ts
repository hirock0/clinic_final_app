import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET(req: NextRequest, res: any) {
  try {
    const { email } = await res.params;
    if (email) {
      const client = await DBConnection();
      const applicationDB = client.db("unitedCare").collection("jobs");
      const appliedJobs = await applicationDB
        .find({
          userIdandEmails: {
            $elemMatch: {
              userEmail: email,
            },
          },
        })
        .toArray();
      return NextResponse.json({
        message: "data fouJobnd",
        success: true,
        appliedJobs: appliedJobs,
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
