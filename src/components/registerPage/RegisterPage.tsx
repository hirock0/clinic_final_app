"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import swal from "sweetalert";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Register({flag})
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
            type="email"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block font-medium">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border rounded pr-10"
          />
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Retype Password */}
        <div className="relative">
          <label className="block font-medium">Retype Password</label>
          <input
            {...register("retypePassword", {
              required: "Please retype password",
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
            type={showRetypePassword ? "text" : "password"}
            className="w-full p-2 border rounded pr-10"
          />
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowRetypePassword((prev) => !prev)}
          >
            {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.retypePassword && (
            <p className="text-red-500">{errors.retypePassword.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Profile Image</label>
          <input
            {...register("image", { required: "Image is required" })}
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-24 h-24 rounded object-cover"
            />
          )}
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center">
          <input
            {...register("terms", { required: "You must agree to the terms" })}
            type="checkbox"
            className="mr-2"
          />
          <span>I agree to the terms and conditions</span>
        </div>
        {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 rounded text-white flex items-center justify-center gap-2 bg-primary`}
        >
          {isLoading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
