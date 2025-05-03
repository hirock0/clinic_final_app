"use client";

import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import { useRouter, usePathname } from "next/navigation";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  resume: FileList;
  coverLetter?: string;
  numberOfPositions: string;
  facilityName: string;
  _id: string;
}

const ApplyForm = ({
  job,
  onClose,
}: {
  job: FormData | any;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state?.slices?.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [successMessage, setSuccessMessage] = useState("");

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      
      const base64Resume = await fileToBase64(data.resume[0]);
      const payload = {
        jobId: job._id,
        userEmail: userData?.email,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        resumeBase64: base64Resume,
        coverLetter: data.coverLetter || "",
        facilityName: job.facilityName,
        position: job.numberOfPositions,
      };

      const response = await axios.post(
        "/pages/api/user/applied_jobs",
        payload
      );

      if (response?.data?.success) {
        setSuccessMessage("Application submitted successfully!");
        reset();
        setTimeout(onClose, 2000);
        swal({
          title: response?.data?.message,
          icon: "success",
        });
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error: any) {
      throw new Error(String(error?.message));
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-xl font-semibold mb-2">
          Apply to {job?.facilityName}
        </h3>
        <p className="text-gray-600 mb-6">Position: {job?.numberOfPositions}</p>

        {successMessage && (
          <div className="text-green-600 text-sm mb-4">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone*
              </label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume/CV*
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register("resume", { required: "Resume is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.resume && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.resume.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                rows={4}
                {...register("coverLetter")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
