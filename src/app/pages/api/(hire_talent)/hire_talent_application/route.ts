import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: any) {
  try {
    const reqBody = await req.json();
    const timeStamp = Date.now();
    const postdDate = new Date().toLocaleDateString();
    const userIdandEmails: string[] = [];
    const client = await DBConnection();
    const db = client.db("unitedCare");
    const collection = db.collection("jobs");
    const savedData = await collection.insertOne({
      timeStamp,
      postdDate,
      userIdandEmails,
      ...reqBody,
    });
    if (savedData?.insertedId) {
      return NextResponse.json({
        message: "Job Submitted",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Job not Submitted",
        success: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
