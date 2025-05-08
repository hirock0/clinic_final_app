import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req?.json();
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({
        message: "Invalid application ID",
        success: false,
      });
    }
    const client = await DBConnection();
    const Application = client.db("UserApplication").collection("applications");
    const existingApp = await Application.findOne({
      _id: new ObjectId(String(id)),
    });
    if (!existingApp) {
      return NextResponse.json({
        message: "Application not found",
        success: false,
      });
    }
    if (existingApp.status === "approved") {
      return NextResponse.json({ message: "Already approved", success: false });
    }
    const updateResult = await Application.updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: { status: "approved" } }
    );
    if (updateResult.modifiedCount === 1) {
      return NextResponse.json({
        message: "Application approved",
        success: true,
      });
    } else {
      return NextResponse.json({ message: "Update failed", success: false });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
}
