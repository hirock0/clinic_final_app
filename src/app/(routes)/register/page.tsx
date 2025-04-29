"use client"; // If you're using app directory

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/register/input/Input";
import { Button } from "@/components/ui/register/button/Button";
import swal from "sweetalert";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  employerType: string;
  position: string;
  additional1: string;
  additional2: string;
  projectDetails: string;
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [employerType, setEmployerType] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await axios.post("/pages/api/authentication/register", data);
      if (res?.data?.success) {
        swal({
          title: res?.data?.message,
          icon: "success",
        });
        setLoading(false);
      } else {
        swal({
          title: res?.data?.message,
          icon: "warning",
        });
        setLoading(false);
      }
    } catch (error: any) {
      swal({
        title: error?.message,
        icon: "warning",
      });
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const handleEmployerTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setEmployerType(selectedValue);

    if (selectedValue !== "Company") {
      setValue("company", "");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto w-11/12 bg-base-100">
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center">
        {/* Left Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <Image
            src="https://cdn.pixabay.com/photo/2018/07/12/21/32/subscribe-3534409_1280.jpg"
            alt="Register Illustration"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 w-full p-8 space-y-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              type="text"
              placeholder="First Name*"
              {...register("firstName", { required: true })}
            />
            <Input
              type="text"
              placeholder="Last Name*"
              {...register("lastName", { required: true })}
            />
            <Input
              type="email"
              placeholder="Work email*"
              {...register("email", { required: true })}
            />
            <Input
              type="text"
              placeholder="Company Name"
              {...register("company")}
            />

            <select
              {...register("employerType")}
              className="select select-bordered w-full"
              onChange={handleEmployerTypeChange}
            >
              <option value="">Employer</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Company">Company</option>
            </select>

            {/* Conditionally render additional inputs if 'Company' is selected */}
            {employerType === "Company" && (
              <>
                <Input
                  type="text"
                  placeholder="Company Name"
                  {...register("company", {
                    required: employerType === "Company",
                  })}
                />
                <Input
                  type="text"
                  placeholder="What position are you hiring for?*"
                  {...register("position", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Additional Positions"
                  {...register("additional1")}
                />
                <Input
                  type="text"
                  placeholder="Additional Positions"
                  {...register("additional2")}
                />
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Please let us know more about your project"
                  {...register("projectDetails")}
                ></textarea>
              </>
            )}

            <Button
              type="submit"
              className="btn btn-primary w-full flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>

            <div className="divider">or</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn w-full flex items-center justify-center gap-2 border"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
