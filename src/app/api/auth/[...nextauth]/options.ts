export const dynamic = "force-dynamic";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { DBConnection } from "@/lib/dbConnection/DBConnection";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const client = await DBConnection();
        const userDB = client.db("Users").collection("loggedUsers");
        const findUser: any = await userDB.findOne({ email: user?.email });

        if (!findUser) {
          const userDetails = {
            googleId: user?.id,
            image: {
              secure_url: user?.image,
              public_id: null,
            },
            name: user?.name,
            email: user?.email,
            role: "user",
          };

          const responseToUserDB = await userDB.insertOne(userDetails);

          if (responseToUserDB?.insertedId) {
            const tokenData = {
              image: { secure_url: user?.image, public_id: null },
              name: user?.name,
              email: user?.email,
              role: "user",
            };
            const userToken = jwt.sign(tokenData, process.env.JWT_SECRET!, {
              expiresIn: "7d",
            });
            (await cookies()).set("userToken", userToken, { httpOnly: true });
          }
        } else {
          const tokenData = {
            image: {
              secure_url: findUser?.image?.secure_url,
              public_id: null,
            },
            name: findUser?.name,
            email: findUser?.email,
            role: "user",
          };
          const userToken = jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: "7d",
          });
          (await cookies()).set("userToken", userToken, { httpOnly: true });
        }
      }

      return token;
    },
  },
};
