import { NextRequest, NextResponse } from "next/server";
import { DBConnection } from "@/lib/dbConnection/DBConnection";
import { UploadToCloudinary } from "@/lib/cloudinary/Cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_default_dev_secret";
export async function POST(request: NextRequest) {
  //   try {
  //     const {
  //       userImage,
  //       userName,
  //       userEmail,
  //       userPassword,
  //       userReTypePassword,
  //       userTermsChecked,
  //     } = await request.json();
  //     if (
  //       !userName ||
  //       !userEmail ||
  //       !userPassword ||
  //       !userReTypePassword ||
  //       !userTermsChecked ||
  //       !userImage
  //     ) {
  //       return NextResponse.json({
  //         message: "All fields including image are required",
  //         success: false,
  //       });
  //     }
  //     if (userPassword !== userReTypePassword) {
  //       return NextResponse.json({
  //         message: "Passwords do not match",
  //         success: false,
  //       });
  //     }
  //     const client = await DBConnection();
  //     const DB = client.db("authentication");
  //     const authUser = DB.collection("users");
  //     const existingUser = await authUser.findOne({ email: userEmail });
  //     if (existingUser) {
  //       return NextResponse.json({
  //         message: "User already exists",
  //         success: false,
  //       });
  //     }
  //     const uploadResult = await UploadToCloudinary(
  //       userImage,
  //       "UnitatedCareLinks/AuthUser/images"
  //     );

  //     if (!uploadResult?.secure_url || !uploadResult?.public_id) {
  //       return NextResponse.json({
  //         message: "Image upload failed. Registration aborted.",
  //         success: false,
  //       });
  //     }

  //     const hashedPassword = await bcrypt.hash(userPassword, 10);
  //     const newUser = {
  //       name: userName,
  //       email: userEmail,
  //       password: hashedPassword,
  //       role: "user",
  //       image: {
  //         secure_url: uploadResult.secure_url,
  //         public_id: uploadResult.public_id,
  //       },
  //       createdAt: new Date(),
  //     };

  //     await authUser.insertOne(newUser);
  //     const token = jwt.sign(
  //       {
  //         name: userName,
  //         email: userEmail,
  //         image: uploadResult.secure_url,
  //         role: "user",
  //       },
  //       JWT_SECRET,
  //       { expiresIn: "7d" }
  //     );

  //     const response = NextResponse.json({
  //       message: "Registered successfully",
  //       success: true,
  //     });

  //     response.cookies.set("auth_token", token, {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       secure: false,
  //       path: "/",
  //       maxAge: 7 * 24 * 60 * 60, // 7 days
  //     });

  //     return response;
  //   } catch (error: any) {
  //     return NextResponse.json({
  //       message: error.message || "Something went wrong",
  //       success: false,
  //     });
  //   }

  try {
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   company,
    //   employerType,
    //   position,
    //   additional1,
    //   additional2,
    //   projectDetails,
    // } = await request.json();
    const reqBody = await request.json()
    console.log(reqBody)

    // console.log(
    //   firstName,
    //   lastName,
    //   email,
    //   company,
    //   employerType,
    //   position,
    //   additional1,
    //   additional2,
    //   projectDetails
    // );
    return NextResponse.json({
      message: "Register successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
}
