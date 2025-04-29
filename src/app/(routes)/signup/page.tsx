"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import useUserStore from "@/utils/zustand/store/useUserStore";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaImage,
} from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  password: string;
  reTypePassword: string;
  image: string;
};

export default function SignupPage() {
  const { user, setUser, clearUser } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showReTypePassword, setShowReTypePassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const password = watch("password");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("image", base64String);
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    // Check if password and reTypePassword match
    if (data.password !== data.reTypePassword) {
      swal({
        title: "Passwords do not match!",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const { reTypePassword, ...submitData } = data; // Remove reTypePassword before sending
      const response = await axios.post(
        "/pages/api/authentication/signup",
        submitData
      );
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        reset();
        setPreviewImage(null);
        setUser(response?.data?.token);
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error: any) {
      swal({
        title: error?.message || "Something went wrong!",
        icon: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="flex-1 outline-none"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email Field */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="flex-1 outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password Field */}
          <div className="flex items-center border rounded-lg px-3 py-2 relative">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="flex-1 outline-none pr-8"
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Re-type Password Field */}
          <div className="flex items-center border rounded-lg px-3 py-2 relative">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showReTypePassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("reTypePassword", {
                required: "Please confirm your password",
              })}
              className="flex-1 outline-none pr-8"
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowReTypePassword(!showReTypePassword)}
            >
              {showReTypePassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.reTypePassword && (
            <p className="text-red-500 text-sm">
              {errors.reTypePassword.message}
            </p>
          )}

          {/* Image Upload Field */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <FaImage className="text-gray-400" />
              <span className="text-sm">Upload Profile Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full mx-auto"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
