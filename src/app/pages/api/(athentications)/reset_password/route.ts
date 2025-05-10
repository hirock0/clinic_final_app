import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { password, email, role } = await request.json();
    const client = await DBConnection();
    const db = client.db("AllUsers");
    const collection = db.collection(role);

    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    if (result.matchedCount >= 1) {
      return NextResponse.json({ message: "Password reset successfully", success: true });
    }
    return NextResponse.json({ message: "Password reset failed", success: false });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Something went wrong", success: false });
  }
}
