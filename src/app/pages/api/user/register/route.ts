import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { UploadToCloudinary } from "@/lib/cloudinary/Cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const { name, email, password, image, terms } = await request.json();
    const client = await DBConnection();
    const userDB = client.db("AdminDB").collection("loggedUsers");
    const existingUser = await userDB.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }

    const uploadResult = await UploadToCloudinary(
      image,
      "UnitatedCareLinks/Users/images"
    );

    if (!uploadResult?.secure_url || !uploadResult?.public_id) {
      return NextResponse.json({
        message: "Image upload failed. Registration aborted.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
      role: "user",
      image: {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      terms,
      createdAt: new Date(),
    };

    await userDB.insertOne(newUser);
    const tokenData = {
      name: name,
      email: email,
      image: uploadResult.secure_url,
      role: "user",
    };
    const userToken = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Signup successfully",
      success: true,
      token: userToken,
    });

    response.cookies.set("userToken", userToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message,
      success: false,
    });
  }
}
