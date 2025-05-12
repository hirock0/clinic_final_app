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
    <div className=" h-screen flex items-center">
        <Link
          href="/"
          className="main-text-color font-semibold hover:underline"
        >
          ← Home
        </Link>
      <div className="max-w-[1024px] w-11/12 mx-auto ">
        <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Left Side Image */}
          <div className="hidden md:flex md:w-1/2  items-center justify-center ">
            <div className="">
              <iframe
                className=" w-96 h-96"
                src="https://lottie.host/embed/17a751d3-cc6d-4915-9cfc-f9845b2ec82c/Ovbn7my9PY.lottie"
              ></iframe>
            </div>
          </div>
          {/* Right Side Form */}
          <div className="w-full md:w-1/2 p-8 space-y-6">
            <h1 className="text-3xl uppercase font-bold main-text-color text-center">
              Login Job Seeker
            </h1>
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
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            {/* Google Login */}
            {flag === "user" && (
              <button
                onClick={googleLoginHandler}
                className="w-full btn btn-outline btn-accent flex items-center justify-center gap-2"
              >
                {!gooleLoading ? (
                  <>
                    <FaGoogle />
                    <span>Sign in with Google</span>
                  </>
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            )}
            {/* Footer */}
            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                href={`/${flag}/register?redirectTo=${redirectTo}`}
                className="main-text-color hover:underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
