import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request?.json();
    const { id, role } = reqBody;
    const client = await DBConnection();
    const filter = {
      _id: new ObjectId(String(id)),
    };
    const users = client.db("AllUsers").collection("employee");
    const response = await users.findOneAndDelete(filter);
    if (response) {
      return NextResponse.json({
        message: "Delete successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Delete not successfully",
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
