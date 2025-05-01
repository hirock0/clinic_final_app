"use client";

import { useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Link from "next/link";
type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 for password toggle

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const response = await axios.post("/pages/api/employee/login", data);
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        router.push("/employee/dashboard");
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error: any) {
      swal(
        "Error!",
        error.response?.data?.message || "Login failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600">Login</h1>

        {/* Email Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-gray-600 font-semibold">
            Email
          </label>
          <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
            <FaUserAlt className="text-gray-400 mr-3" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-1 relative">
          <label htmlFor="password" className="text-gray-600 font-semibold">
            Password
          </label>
          <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 relative">
            <FaLock className="text-gray-400 mr-3" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="flex-1 bg-transparent focus:outline-none"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 cursor-pointer text-gray-400"
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span> // 👈 DaisyUI loader
          ) : (
            "Sign In"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link href={"/employee/signup"}>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}
