"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
} from "react-icons/fa";
import swal from "sweetalert";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

type FormData = {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
  image: FileList;
  terms: boolean;
  flag: string;
};

export default function RegisterPage({ flag }: { flag: string }) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || `/${flag}/dashboard`;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.retypePassword) {
      alert("Passwords do not match");
      return;
    }

    if (!base64Image) {
      alert("Please upload a valid image");
      return;
    }

    setIsLoading(true);
    data.flag = flag;
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: base64Image,
      terms: data.terms,
      flag: data.flag,
    };

    try {
      const response = await axios.post(`/pages/api/register`, payload);
      if (response?.data?.success) {
        swal({ title: response?.data?.message, icon: "success" });
        router.push(redirectTo);
      } else {
        swal({ title: response?.data?.message, icon: "warning" });
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64Image(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" bg-zinc-200 py-10">
      <div className="max-w-[1440px] rounded-xl overflow-hidden shadow-xl w-11/12 mx-auto">
        <div className="  flex flex-col md:flex-row ">
          <div className="md:w-1/2 max-md:hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col justify-center items-center p-10">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-lg mb-8 text-center max-w-sm">
              Join us today and experience premium access tailored just for{" "}
              <span className="font-semibold">{flag}</span>.
            </p>
            <iframe
              className="w-96 h-96"
              src="https://lottie.host/embed/17a751d3-cc6d-4915-9cfc-f9845b2ec82c/Ovbn7my9PY.lottie"
            ></iframe>
          </div>

          <div className="md:w-1/2 w-full bg-white p-8 md:p-16 shadow-md">
            <h2 className="text-2xl uppercase font-bold mb-6 text-center text-gray-700">
              Register ({flag})
            </h2>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-4 text-indigo-600 hover:underline flex items-center gap-2"
            >
              ← Back
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-medium text-gray-700 flex items-center gap-2">
                  <FaUser /> Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-700 flex items-center gap-2">
                  <FaEnvelope /> Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block font-medium text-gray-700 flex items-center gap-2">
                  <FaLock /> Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <span
                  className="absolute right-3 top-10 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Retype Password */}
              <div className="relative">
                <label className="block font-medium text-gray-700 flex items-center gap-2">
                  <FaLock /> Retype Password
                </label>
                <input
                  {...register("retypePassword", {
                    required: "Please retype password",
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match",
                  })}
                  type={showRetypePassword ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <span
                  className="absolute right-3 top-10 text-gray-600 cursor-pointer"
                  onClick={() => setShowRetypePassword((prev) => !prev)}
                >
                  {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.retypePassword && (
                  <p className="text-red-500 text-sm">
                    {errors.retypePassword.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block font-medium text-gray-700 flex items-center gap-2">
                  <FaImage /> Profile Image
                </label>
                <input
                  {...register("image", { required: "Image is required" })}
                  type="file"
                  accept="image/*"
                  className="w-full mt-1"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-2 w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className=" w-full h-full object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                )}
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center">
                <input
                  {...register("terms", {
                    required: "You must agree to terms",
                  })}
                  type="checkbox"
                  className="mr-2"
                />
                <span className="text-gray-700 flex items-center gap-1">
                  I agree to the terms and conditions
                </span>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms.message}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded font-semibold"
              >
                {isLoading ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
