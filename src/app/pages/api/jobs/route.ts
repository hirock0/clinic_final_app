import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "../../../../lib/dbConnection/DBConnection";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const client = await DBConnection();
    const db = client.db("unitedCare");
    const collection = db.collection("jobs");
    const data = await req.json();
    const result = await collection.insertOne(data);
    return NextResponse.json({
      message: "Data inserted successfully",
      result,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Error inserting data", success: false });
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
