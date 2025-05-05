"use client";

import { fetchData } from "@/utils/redux/slices/slice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FiUpload, FiCalendar, FiUser, FiX } from "react-icons/fi";
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
  contactMethod: string[];
  positions: string[];
  otherPosition: string;
  startDate: string;
  shifts: string[];
  employmentType: string;
  licenseType: string;
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: string;
  cprCertified: string;
  otherCertifications: string;
  highSchool: string;
  highSchoolLocation: string;
  highSchoolYear: string;
  nursingSchool: string;
  degreeEarned: string;
  nursingSchoolYear: string;
  recentEmployer: string;
  jobTitle: string;
  supervisorName: string;
  employerPhone: string;
  employmentDates: string;
  leavingReason: string;
  contactEmployer: string;
  reference1Name: string;
  reference1Relationship: string;
  reference1Phone: string;
  reference1Email: string;
  reference2Name: string;
  reference2Relationship: string;
  reference2Phone: string;
  reference2Email: string;
  backgroundCheck: string;
  felonyConviction: string;
  felonyExplanation: string;
  whyHealthcare: string;
  specialSkills: string;
  signature: any;
  date: string;
  resume: any;
  userEmail: string;
}

interface Job {
  facilityName: string;
  numberOfPositions: string;
}

const HealthcareApplicationForm = ({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.slices);
  useEffect(() => {
    dispatch(fetchData);
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const contactMethods = [
    { value: "phone", label: "Phone" },
    { value: "email", label: "Email" },
    { value: "text", label: "Text" },
  ];
  const healthcarePositions = [
    { id: "caregiver", label: "Caregiver" },
    { id: "cna", label: "Certified Nursing Assistant (CNA)" },
    { id: "rn", label: "Registered Nurse (RN)" },
    { id: "lpn", label: "Licensed Practical Nurse (LPN)" },
    { id: "medical-assistant", label: "Medical Assistant" },
    { id: "home-health-aide", label: "Home Health Aide" },
    { id: "other", label: "Other" },
  ];
  const positions = watch("positions") || [];

  // Watch the felonyConviction field value
  const felonyConviction = useWatch({
    control,
    name: "felonyConviction",
    defaultValue: "No",
  });

  const onSubmit = async (data: FormData) => {
    setloading(true);
    const resumeFile = data.resume[0];
    const signatureFile = data.signature[0];
    const resumeBase64 = await convertToBase64(resumeFile);
    const signatureBase64 = await convertToBase64(signatureFile);
    data.resume = resumeBase64;
    data.signature = signatureBase64;
    data.userEmail = user?.email;
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
      <div className="fixed inset-0 backdrop:filter backdrop-blur-[2px] bg-slate-800/50 flex items-center justify-center z-50 p-4">
        <div className=" relative ">
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
                className="absolute right-5 top-5 bg-green-600 text-white rounded-xs shadow-lg hover:scale-105 hover:text-gray-700 p-1 cursor-pointer"
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
              </section>

              {/* Position Applied For */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Position Applied For (Select all that apply)
                </h2>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {healthcarePositions.map((position) => (
                      <div key={position.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`health-care-${position.id}`}
                          value={position.label}
                          {...register("positions", {
                            validate: (value = []) =>
                              value.length > 0 ||
                              "Please select at least one position",
                          })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`health-care-${position.id}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {position.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {errors.positions && (
                    <p className=" text-sm text-red-500">
                      {errors.positions.message}
                    </p>
                  )}

                  {positions.includes("Other") && (
                    <div className="mt-3">
                      <input
                        type="text"
                        {...register("otherPosition", {
                          required: "Please specify the other staff type",
                        })}
                        placeholder="Please specify"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                      {errors.otherPosition && (
                        <p className="text-sm text-red-600">
                          {errors.otherPosition.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* Availability */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiCalendar className="mr-2" /> Availability
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Desired Start Date*
                    </label>
                    <input
                      type="date"
                      {...register("startDate", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Shifts*
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Day", "Evening", "Night", "Weekends"].map((shift) => (
                        <label key={shift} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={shift}
                            {...register("shifts", { required: true })}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2">{shift}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Type*
                    </label>
                    <div className="space-y-2">
                      {["Full-Time", "Part-Time", "Per Diem", "Live-in"].map(
                        (type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="radio"
                              value={type}
                              {...register("employmentType", {
                                required: true,
                              })}
                              className="h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">{type}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* License & Certification Information */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4">
                  License & Certification Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Type (RN, CNA, etc.)
                    </label>
                    <input
                      type="text"
                      {...register("licenseType", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Number
                    </label>
                    <input
                      type="text"
                      {...register("licenseNumber", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State of Issuance
                    </label>
                    <input
                      type="text"
                      {...register("licenseState", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      {...register("licenseExpiry", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPR/First Aid Certified?*
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value={"yes"}
                        {...register("cprCertified", { required: true })}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value={"no"}
                        {...register("cprCertified", { required: true })}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Other Certifications
                  </label>
                  <input
                    type="text"
                    {...register("otherCertifications", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </section>

              {/* Education */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4">Education</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      High School Name & Location
                    </label>
                    <input
                      type="text"
                      {...register("highSchool", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      {...register("highSchoolYear", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nursing/Healthcare School
                    </label>
                    <input
                      type="text"
                      {...register("nursingSchool", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree/Certificate Earned
                    </label>
                    <input
                      type="text"
                      {...register("degreeEarned", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      {...register("nursingSchoolYear", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </section>

              {/* Work Experience */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
                <h3 className="text-lg font-medium mb-2">
                  Most Recent Employer
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      {...register("recentEmployer", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      {...register("jobTitle", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supervisor Name
                    </label>
                    <input
                      type="text"
                      {...register("supervisorName", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("employerPhone", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dates of Employment*
                    </label>
                    <input
                      type="text"
                      {...register("employmentDates", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Leaving
                    </label>
                    <input
                      type="text"
                      {...register("leavingReason", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    May we contact this employer?*
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("contactEmployer", { required: true })}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="No"
                        {...register("contactEmployer")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Experience (Attach Resume if Available)
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer">
                      <FiUpload className="mr-2" />
                      Upload Resume
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        {...register("resume", {
                          required: "Resume is required",
                        })}
                      />
                    </label>
                    <span className="ml-2 text-sm text-gray-500">
                      PDF, DOC, DOCX (Max 2MB)
                    </span>
                  </div>
                </div>
              </section>

              {/* References */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4">References</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Provide at least two professional references:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Reference 1 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Reference 1*</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name*
                      </label>
                      <input
                        type="text"
                        {...register("reference1Name", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship*
                      </label>
                      <input
                        type="text"
                        {...register("reference1Relationship", {
                          required: true,
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        {...register("reference1Phone", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("reference1Email", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Reference 2 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Reference 2*</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name*
                      </label>
                      <input
                        type="text"
                        {...register("reference2Email", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship*
                      </label>
                      <input
                        type="text"
                        {...register("reference2Relationship", {
                          required: true,
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        {...register("reference2Phone", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("reference2Email", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Background Check Consent */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Background Check Consent
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Are you willing to undergo a background check?*
                    </label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="Yes"
                          {...register("backgroundCheck", { required: true })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="No"
                          {...register("backgroundCheck", { required: true })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you ever been convicted of a felony?*
                    </label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="Yes"
                          {...register("felonyConviction", { required: true })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="No"
                          {...register("felonyConviction", { required: true })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  {felonyConviction === "Yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        If yes, please explain:
                      </label>
                      <textarea
                        {...register("felonyExplanation", { required: true })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Additional Information */}
              <section className="border-gray-200 border-b  pb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Additional Information
                </h2>

                <div className="space-y-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Do you have any special skills or experiences that make
                      you a great fit for this role?
                    </label>
                    <textarea
                      {...register("specialSkills", { required: true })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </section>

              {/* Applicant Declaration */}
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Applicant Declaration
                </h2>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-700">
                    I certify that the information provided is true and
                    complete. I understand that false information may disqualify
                    me from employment consideration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Signature*
                    </label>
                    <div className="mt-1 flex items-center">
                      <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer">
                        <FiUpload className="mr-2" />
                        Signature
                        <input
                          type="file"
                          className="sr-only"
                          accept=".png,.jpg,.jpeg,.svg"
                          {...register("signature", {
                            required: "Signature is required",
                          })}
                        />
                      </label>
                      <span className="ml-2 text-sm text-gray-500">
                        PNG,JPG, SVG(Max 1MB)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date*
                    </label>
                    <input
                      type="date"
                      {...register("date", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
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
};

export default HealthcareApplicationForm;
