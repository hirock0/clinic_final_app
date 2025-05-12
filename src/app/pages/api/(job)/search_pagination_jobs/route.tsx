import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "12");
    const skip = (page - 1) * perPage;
    const client = await DBConnection();
    const applicationDB = client.db("unitedCare").collection("jobs");
    const totalCount = await applicationDB.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    const pageJobs = await applicationDB
      .find({approvedStatus:true})
      .sort({ timeStamp: -1 })
      .skip(skip)
      .limit(perPage)
      .toArray();
      
    return NextResponse.json({
      message: "All data got it!",
      success: true,
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalCount: totalCount,
      pageJobs

    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
