
"use client";
import { fetchData } from "@/utils/redux/slices/slice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload, FiUser, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
interface FormData {
    fullName: string;
    dob: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    resume: any;
    contactMethod: string[];
    whyHealthcare: string;
    userEmail: string;
    jobId: string;
}

interface Job {
    facilityName: string;
    numberOfPositions: string;
    _id: string;
}

const HealthcareApplicationForm = ({
    job,
    onClose,
}: {
    job: Job;
    onClose: () => void;
}) => {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state?.slices);
    useEffect(() => {
        dispatch(fetchData);
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const contactMethods = [
        { value: "phone", label: "Phone" },
        { value: "email", label: "Email" },
        { value: "text", label: "Text" },
    ];


    const onSubmit = async (data: FormData) => {
        setloading(true);
        const resumeFile = data.resume[0];
        const resumeBase64 = await convertToBase64(resumeFile);
        data.resume = resumeBase64;
        data.userEmail = user?.email;
        data.jobId = job?._id;
        try {
            const response = await axios.post("/pages/api/job_application", data);
            if (response?.data?.success) {
                swal({
                    title: response?.data?.message,
                    icon: "success",
                });
                setloading(false);
            } else {
                swal({
                    title: response?.data?.message,
                    icon: "warning",
                });
                setloading(false);
            }
        } catch (error: any) {
            setloading(false);
            throw new Error(error.message);
        }
    };
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="relative">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-10">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Apply to {job?.facilityName}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Position: {job?.numberOfPositions}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute right-5 top-5 bg-base-300 text-gray-700 hover:text-red-500 rounded-md shadow-sm transition-colors duration-300 p-1 cursor-pointer"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Personal Information */}
                            <section className="border-gray-200 border-b   pb-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <FiUser className="mr-2" /> Personal Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name*
                                        </label>
                                        <input
                                            type="text"
                                            {...register("fullName", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Birth*
                                        </label>
                                        <input
                                            type="date"
                                            {...register("dob", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender
                                        </label>
                                        <select
                                            {...register("gender")}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="transgender">Transgender</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address*
                                        </label>
                                        <input
                                            type="text"
                                            {...register("address", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City*
                                        </label>
                                        <input
                                            type="text"
                                            {...register("city", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State*
                                            </label>
                                            <input
                                                type="text"
                                                {...register("state", { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ZIP Code*
                                            </label>
                                            <input
                                                type="text"
                                                {...register("zip", { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number*
                                        </label>
                                        <input
                                            type="tel"
                                            {...register("phone", { required: true })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address*
                                        </label>
                                        <input
                                            type="email"
                                            {...register("email", {
                                                required: true,
                                                pattern: {
                                                    value:
                                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Please enter a valid email address",
                                                },
                                            })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.email && (
                                            <span className="text-red-500 text-sm">
                                                {errors.email?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preferred Method of Contact*
                                    </label>
                                    <div className="flex flex-wrap gap-4">
                                        {contactMethods.map((method) => (
                                            <div key={method.value} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`contact-${method.value}`}
                                                    value={method.value}
                                                    {...register("contactMethod")}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor={`contact-${method.value}`}
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    {method.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.contactMethod && (
                                        <span className="text-sm text-red-500">
                                            {errors.contactMethod.message}
                                        </span>
                                    )}
                                </div>

                                {/* resume upload section  */}
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Experience (Attach Resume if Available)</label>
                                    <div className="mt-1 flex items-center">
                                        <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer">
                                            <FiUpload className="mr-2" />
                                            Upload Resume
                                            <input
                                                type="file"
                                                className="sr-only"
                                                accept=".pdf,.doc,.docx"
                                                {...register('resume', {
                                                    required: 'Resume is required',
                                                })}
                                            />
                                        </label>
                                        <span className="ml-2 text-sm text-gray-500">
                                            PDF, DOC, DOCX (Max 2MB)
                                        </span>
                                    </div>
                                </div>


                            </section>




                            {/* Additional Information */}
                            <section className="border-gray-200 border-b  pb-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Additional Information
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Why do you want to work in healthcare?*
                                    </label>
                                    <textarea
                                        {...register("whyHealthcare", { required: true })}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </section>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {!loading ? (
                                        "Submit Application"
                                    ) : (
                                        <div className=" loading loading-spinner"></div>
                                    )}
                                </button>
                                :
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HealthcareApplicationForm;
