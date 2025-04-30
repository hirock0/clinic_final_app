import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const filter = {
      email: email,
    };
    const update = {
      $set: { role: "approvedEmployee" },
    };
    const client = await DBConnection();
    const findUser = await client
      .db("AdminDB")
      .collection("loggedUsers")
      .find(filter)
      .toArray();
    const matchedRole = findUser[0]?.role === "approvedEmployee";
    if (matchedRole) {
      return NextResponse.json({
        message: "Already approved",
        success: true,
      });
    } else {
      const updateUser = await client
        .db("AdminDB")
        .collection("loggedUsers")
        .findOneAndUpdate(filter, update);

      if (!updateUser) {
        return NextResponse.json({
          message: "Not appreoved employee",
          success: true,
        });
      } else {
        return NextResponse.json({
          message: "Appreoved employee",
          success: true,
        });
      }
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
