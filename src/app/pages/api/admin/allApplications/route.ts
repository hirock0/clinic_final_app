import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function GET() {
  try {
    const client = await DBConnection();
    const applicationDB = client
      .db("UserApplication")
      .collection("applications");
    const allApplications = await applicationDB
      .find()
      .sort({
        timeStamp: -1,
      })
      .toArray();
    return NextResponse.json({
      message: "Data got it!",
      success: false,
      applications: allApplications,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
