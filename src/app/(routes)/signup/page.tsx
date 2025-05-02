"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaEnvelope, FaImage } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
  role: "user" | "admin";
  image: string; // base64 image
};

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        image: imagePreview,
      };

      const res = await axios.post("/pages/api/authentication/signup", payload);
      alert("Signup successful!");
      reset();
      setImagePreview(null);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md p-8 shadow-lg bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2"><FaUser /> Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2"><FaEnvelope /> Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2"><FaLock /> Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Retype Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2"><FaLock /> Retype Password</span>
            </label>
            <div className="relative">
              <input
                type={showRetypePassword ? "text" : "password"}
                placeholder="Retype Password"
                className="input input-bordered w-full pr-10"
                {...register("retypePassword", { required: "Please retype your password" })}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              >
                {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.retypePassword && <p className="text-red-500 text-sm">{errors.retypePassword.message}</p>}
          </div>

          {/* Role Select */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select className="select select-bordered" {...register("role", { required: true })}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2"><FaImage /> Upload Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-md w-32 h-32 object-cover mx-auto"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignupPage;
