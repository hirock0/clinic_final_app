import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { ...rest } = reqBody;
    const client = await DBConnection();
    const db = client.db("unitedCare");
    const collection = db.collection("jobs");
    const timeStamp = Date.now();
    const postdDate = new Date().toLocaleDateString();
    const appliedUsers: string[] = [];
    const approvedStatus: boolean = false;

    const result = await collection.insertOne({
      timeStamp,
      postdDate,
      appliedUsers,
      approvedStatus,
      ...rest,
    });
    return NextResponse.json({
      message: "Data inserted successfully",
      result,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}

export async function GET(req: NextRequest, res: any) {
  try {
    const client = await DBConnection();
    const db = client.db("unitedCare");
    const collection = db.collection("jobs");
    const data = await collection.find().toArray();
    return NextResponse.json({
      message: "Data fetch successfully",
      data,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
