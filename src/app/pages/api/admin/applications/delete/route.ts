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
    const deleteResult = await Application.deleteOne({
      _id: new ObjectId(String(id)),
    });
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({
        message: "Application not found",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Application deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
}
