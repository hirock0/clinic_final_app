import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { ObjectId } from "mongodb";
interface Job {
  _id: ObjectId;
  userIdandEmails: {
    userTimeStamps: number;
    userAppliedDate: string;
    userEmail: string;
  }[];
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userEmail, jobId, ...extraFields } = body;

    if (!userEmail || !jobId) {
      return NextResponse.json({
        message: "Both userEmail and jobId are required",
        success: false,
      });
    }

    const client = await DBConnection();
    const applicationCollection = client
      .db("UserApplication")
      .collection("applications");

    const jobCollection = client.db("unitedCare").collection<Job>("jobs");

    const alreadyApplied = await applicationCollection.findOne({
      userEmail,
      jobId,
    });
    if (alreadyApplied) {
      return NextResponse.json({
        message: "Application already exists",
        success: false,
      });
    }
    const applicationData = {
      userEmail,
      jobId,
      status: "applied",
      timeStamp: Date.now(),
      appliedDate: new Date().toLocaleDateString(),
      ...extraFields,
    };

    const insertResult = await applicationCollection.insertOne(applicationData);

    if (!insertResult.insertedId) {
      return NextResponse.json({
        message: "Failed to submit application",
        success: false,
      });
    }

    const updateResult = await jobCollection.updateOne(
      { _id: new ObjectId(String(jobId)) },
      {
        $push: {
          userIdandEmails: {
            userTimeStamps: Date.now(),
            userAppliedDate: new Date().toLocaleDateString(),
            userEmail,
          },
        },
      }
    );

    if (!updateResult.acknowledged) {
      return NextResponse.json({
        message: "Application saved but job update failed",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
}
