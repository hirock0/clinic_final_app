"use client";

import { useForm } from "react-hook-form";
import { FaUserAlt, FaLock, FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
type LoginFormInputs = {
  email: string;
  password: string;
  flag: string;
};
export default function LoginPage({ flag }: { flag: string }) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || `/${flag}/dashboard`;
  const router = useRouter();
  const [gooleLoading, setGooleLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      data.flag = flag;
      if (flag === "institutional") {
        const splitData = data?.email.split(".");
        const gmailArr = splitData[0].split("@");
        const gmail = gmailArr[1];
        if (gmail === "gmail") {
          swal({
            title: "Please enter company gmail",
          });
        } else {
          const response = await axios.post(`/pages/api/login`, data);
          if (response?.data?.success) {
            swal({ title: response?.data?.message, icon: "success" });
            router.push(redirectTo);
            setTimeout(() => window.location.reload(), 1000);
          } else {
            swal({ title: response?.data?.message, icon: "warning" });
          }
        }
      } else {
        const response = await axios.post(`/pages/api/login`, data);
        if (response?.data?.success) {
          swal({ title: response?.data?.message, icon: "success" });
          router.push(redirectTo);
          setTimeout(() => window.location.reload(), 1000);
        } else {
          swal({ title: response?.data?.message, icon: "warning" });
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const googleLoginHandler = async () => {
    setGooleLoading(true);
    try {
      await signIn("google", { callbackUrl: redirectTo });
      setTimeout(() => setGooleLoading(false), 1000);
    } catch (error) {
      setGooleLoading(false);
      throw new Error(String(error));
    }
  };
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50">
      {/* Left Image for Large Screens */}
      <div className="hidden lg:block w-1/2 h-full">
        <Image
          src="/nurse-old-man.jpg"
          alt="Login"
          width={500}
          height={500}
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 max-w-md mx-auto p-6 sm:p-10 bg-white shadow-md rounded-2xl">
        {/* Home Button */}
        <Link
          href="/"
          className="main-text-color hover:underline text-sm font-medium mb-6 inline-block"
        >
          ← Home
        </Link>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-left mb-6 uppercase">
          Login Job Seeker
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
              <FaUserAlt className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-50 relative">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full bg-transparent outline-none"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 cursor-pointer text-gray-400"
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full banner-btn1 font-semibold py-3 rounded transition duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4 text-gray-400 text-sm">OR</div>


        {/* Google Login */}
        {flag === "user" && (
          <button
            onClick={googleLoginHandler}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
          >
            {!gooleLoading ? (
              <>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.49 1.45 8.38 3.78l6.22-6.22C34.79 3.41 29.73 1 24 1 14.62 1 6.97 6.95 3.8 15.24l7.5 5.83C12.9 15.08 17.97 9.5 24 9.5z" />
                  <path fill="#34A853" d="M46.15 24.49c0-1.53-.14-3.02-.39-4.45H24v8.43h12.45c-.54 2.83-2.14 5.23-4.51 6.83l7.18 5.56C43.83 36.56 46.15 30.98 46.15 24.49z" />
                  <path fill="#FBBC05" d="M11.3 28.92c-1.15-3.43-1.15-7.11 0-10.54l-7.5-5.84C.84 18.37-.53 21.56.03 24.89c.56 3.33 2.11 6.42 4.44 8.94l7.5-5.83z" />
                  <path fill="#EA4335" d="M24 46c5.73 0 10.79-1.89 14.5-5.13l-7.18-5.56c-2.01 1.35-4.55 2.13-7.32 2.13-6.03 0-11.1-5.58-12.7-12.91l-7.5 5.83C6.97 41.05 14.62 46 24 46z" />
                </svg>
                <span className="text-sm font-medium">Sign in with Google</span>
              </>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        )}

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?
          <Link
            href={`/${flag}/register?redirectTo=${redirectTo}`}
            className="main-text-color hover:underline font-semibold ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>

  );
}
