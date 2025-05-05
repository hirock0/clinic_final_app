import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userEmail, ...rest } = reqBody;
    if (!userEmail) {
      return NextResponse.json({
        message: "userEmail is required",
        success: false,
      });
    }
    const client = await DBConnection();
    const applicationDB = client.db("Application").collection("applications");
    const existingApplication = await applicationDB.findOne({ userEmail });

    if (existingApplication) {
      return NextResponse.json({
        message: "Application already exists in the database",
        success: false,
      });
    }
    await applicationDB.insertOne({ userEmail, ...rest });
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

