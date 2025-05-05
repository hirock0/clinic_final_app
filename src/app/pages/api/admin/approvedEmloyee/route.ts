import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();
  
    const filter = {
      email: email,
    };
    const update = {
      $set: { role: "approvedEmployee" },
    };
    const client = await DBConnection();
    const findUser = await client
      .db("AllUsers")
      .collection(role)
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
        .db("AllUsers")
        .collection(role)
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
