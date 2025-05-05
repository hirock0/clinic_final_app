import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userEmail, jobId, ...rest } = reqBody;
    if (!userEmail || !jobId) {
      return NextResponse.json({
        message: "userEmail and jobId are required",
        success: false,
      });
    }
    const client = await DBConnection();
    const applicationDB = client.db("Application").collection("applications");
    const existingApplication = await applicationDB.findOne({
      userEmail,
      jobId,
    });
    if (existingApplication) {
      return NextResponse.json({
        message: "Application already exists in the database",
        success: false,
      });
    }
    await applicationDB.insertOne({ userEmail, jobId, ...rest });
    return NextResponse.json({
      message: "Form submitted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
