"use client";

import { useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
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
    <section className="min-h-screen flex items-center justify-center bg-zinc-200 py-12">

      <div className="max-w-[1440px] rounded-xl overflow-hidden shadow-xl w-11/12 mx-auto flex flex-col md:flex-row">
      {/* Left Image for Large Screens */}
          <div className="md:w-1/2 max-md:hidden second-bg-color text-white flex flex-col justify-center items-center p-10">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-lg mb-8 text-center max-w-sm">
              Join us today and experience premium access tailored just for

              <span className="font-semibold ml-1">
                {flag === "user" && `Job Seeker`}
                {flag === "institutional" && `Organizer`}
                {flag === "admin" && `Admin`}
                {flag === "employee" && `Employee`}
              </span>.
            </p>
            <iframe
              className="w-96 h-96"
              src="https://lottie.host/embed/10ba0d32-02f9-488d-8036-1db7cd3c573a/mLCoeDDIna.lottie"
            ></iframe>
          </div>

      {/* Login Form */}
      <div className="md:w-1/2 w-full bg-white p-8 md:p-16 shadow-md">
        {/* Home Button */}
        <Link
          href="/"
          className="main-text-color hover:underline text-sm font-medium mb-6 inline-block"
        >
          ← Home
        </Link>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-left mb-6 uppercase">
          {flag === "user" && `LogIn For Job Seeker`}
          {flag === "institutional" && `LogIn For Organizer`}
          {flag === "admin" && `LogIn For Admin`}
          {flag === "employee" && `LogIn For Employee`}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50">
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
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50 relative">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full bg-transparent outline-none "
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
            className="w-full btn2 font-semibold py-3 rounded transition duration-300 disabled:opacity-50 cursor-pointer"
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
        {(flag === "user" || flag === "institutional") && (
          <button
            onClick={googleLoginHandler}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
          >
            {!gooleLoading ? (
              <>
                <FcGoogle size={25} />
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


      </div>

    </section>
  );
}
