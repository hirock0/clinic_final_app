"use client";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import Input from "../ui/inputs/Input";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import BackBtn from "../ui/btns/backBtn/BackBtn";

const staffNeeded = [
  "Registered Nurse (RN)",
  "Licensed Practical Nurse (LPN)",
  "Certified Nursing Assistant (CNA)",
  "Medical Assistant",
  "Physician",
  "Therapist",
  "Other",
];

const facilityData = [
  {
    label: "Medical & Diagnostic Professionals",
    options: [
      "Doctor (MD/DO) – Physicians in various specialties (cardiologist, surgeon, pediatrician)",
      "Physician Assistant (PA) – Can diagnose, treat, and prescribe under doctor supervision",
      "Nurse Practitioner (NP) – Advanced practice nurses who can often work independently",
      "Clinical Nurse Specialist (CNS)",
      "Anesthesiologist Assistant",
      "Radiologist – Doctor specialized in medical imaging",
      "Pathologist – Doctor who analyzes lab results and biopsies",
      "Dentist (DDS/DMD) – Doctor for oral health",
      "Optometrist (OD) – Eye care specialist",
      "Podiatrist (DPM) – Foot and ankle doctor",
      "Chiropractor (DC) – Spine/musculoskeletal specialist",
    ],
  },
  {
    label: "Diagnostic & Lab Professionals",
    options: [
      "Medical Laboratory Scientist",
      "Phlebotomist – Blood draw specialist",
      "Radiologic Technologist (X-ray Tech)",
      "Ultrasound Technician (Sonographer)",
      "MRI/CT Technologist",
      "Nuclear Medicine Technologist",
    ],
  },
  {
    label: "Nursing Professionals",
    options: [
      "Registered Nurse (RN)",
      "Licensed Practical/Vocational Nurse (LPN/LVN)",
      "Certified Nursing Assistant (CNA)",
      "School Nurse",
      "Travel Nurse",
      "Dialysis Nurse",
    ],
  },
  {
    label: "Pharmacy & Medication",
    options: ["Pharmacist (PharmD)", "Pharmacy Technician"],
  },
  {
    label: "Mental & Behavioral Health",
    options: [
      "Psychiatrist (MD)",
      "Psychologist (PhD/PsyD)",
      "Licensed Clinical Social Worker (LCSW)",
      "Marriage & Family Therapist (MFT)",
      "Mental Health Counselor",
      "Substance Abuse Counselor",
      "Behavioral Technician (ABA Tech)",
    ],
  },
  {
    label: "Allied Health Professionals",
    options: [
      "Occupational Therapist (OT)",
      "Physical Therapist (PT)",
      "Speech-Language Pathologist (SLP)",
      "Respiratory Therapist",
      "Athletic Trainer",
      "Audiologist",
    ],
  },
  {
    label: "Dental Support Staff",
    options: ["Dental Hygienist", "Dental Assistant", "Dental Lab Technician"],
  },
  {
    label: "Public Health & Admin",
    options: [
      "Epidemiologist",
      "Public Health Nurse",
      "Health Educator",
      "Community Health Worker",
      "Health Information Technician",
      "Medical Coder/Biller",
      "Healthcare Administrator",
      "Medical Office Assistant",
      "Medical Scribe",
      "Virtual Medical Administrative Assistant",
    ],
  },
  {
    label: "Emergency & Field Support",
    options: [
      "EMT (Emergency Medical Technician)",
      "Paramedic",
      "Flight Nurse",
      "Search and Rescue Medic",
      "Disaster Response Specialist",
    ],
  },
  {
    label: "Direct Patient Care & Support",
    options: [
      "Caregiver",
      "Home Health Aide (HHA)",
      "Personal Care Assistant (PCA)",
      "Companion Caregiver",
      "Hospice Aide",
      "Geriatric Aide",
      "Medical Transport Driver",
    ],
  },
  {
    label: "Transportation",
    options: [
      "Non-Emergency Medical Transportation (NEMT)",
      "Emergency Medical Services (EMS)",
      "Staff Transportation",
      "Interfacility Transport (IFT)",
      "Medical Courier Services",
      "Mobile Clinics/Vehicles",
      "Patient Discharge Transportation",
      "Home Health Visit Transportation",
      "Medical Equipment Delivery Vehicles",
      "Specialty Transport (neonatal or bariatric)",
      "Air Ambulance",
      "Shuttle Services (internal or external)",
      "On-demand Ride Services (Uber Health, Lyft Concierge)",
      "Volunteer Driver Programs",
      "Dial-a-Ride Services",
    ],
  },
];

const shifts = ["Day", "Evening", "Night", "Weekends", "Flexible"];

const ClientForm = ({ job }: any) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facilityName: job?.facilityName,
      facilityType: job?.facilityType,
      contactName: job?.contactName,
      contactEmail: job?.contactEmail,
      contactPhone: job?.contactPhone,
      address: job?.address,
      city: job?.city,
      state: job?.state,
      zipCode: job?.zipCode,
      startDate: job?.startDate,
      numberOfPositions: job?.numberOfPositions,
      assignmentDuration: job?.assignmentDuration,
      additionalNotes: job?.additionalNotes,
      institutionalEmail: job?.institutionalEmail,
      approvedStatus: job?.approvedStatus,
      shiftsNeeded: job?.shiftsNeeded || [],
      staffNeeded: job?.staffNeeded || [],
      otherStaff: job.otherStaff,
      // additionsal_start
      jobFacilityType: job?.jobFacilityType,
      jobFacilityRole: job?.jobFacilityRole,
      minSalary: job?.minSalary,
      maxSalary: job?.maxSalary,
      negotiationNote: job?.negotiationNote,
      salaryNegotiable: job.salaryNegotiable,
      salaryType: job?.salaryType,
      jobSummary: job?.jobSummary,
      uclOverview: job?.uclOverview,
      keyResponsibilities: job?.keyResponsibilities || [],
      qualifications: job?.qualifications || [],
      benefits: job?.benefits || [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const design = "input input-bordered w-full";

  // Watch the selected Job facility  type
  const selectedFacilityLabel = useWatch({
    control,
    name: "jobFacilityType",
  });
  // Salary Negotiable
  const isNegotiable = useWatch({
    control,
    name: "salaryNegotiable",
  });
  // Get the matching role options based on selected label
  const selectedJobFacility = facilityData.find((item) => item.label === selectedFacilityLabel);

  const {
    fields: keyResponsibilitiesFields,
    append: keyResponsibilitiesAppend,
    remove: keyResponsibilitiesRemove,
  } = useFieldArray({
    control,
    name: "keyResponsibilities",
  });
  const {
    fields: qualificationsFields,
    append: qualificationsAppend,
    remove: qualificationsRemove,
  } = useFieldArray({
    control,
    name: "qualifications",
  });
  const {
    fields: benefitsFields,
    append: benefitsAppend,
    remove: benefitsRemove,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (data?.maxSalary < data?.minSalary) {
        swal({ title: "Max is less than min salary", icon: "warning" });
      } else {
        data.jobId = job._id;
        const response = await axios.post(
          "/pages/api/admin/job/update",
          data
        );
        if (response?.data?.success) {
          swal({ title: response?.data?.message, icon: "success" });
        } else {
          swal({ title: response?.data?.message, icon: "warning" });
        }
      }
    } catch (error: any) {
      swal({ title: error.message || "Something went wrong", icon: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-[1440px] w-11/12 mx-auto">
        <BackBtn />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Update Job Posting
          </h2>
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
            {[
              "facilityName",
              "facilityType",
              "address",
              "city",
              "state",
              "zipCode",
              "contactName",
              "contactEmail",
              "contactPhone",
              "numberOfPositions",
              "startDate",
              "assignmentDuration",

            ].map((field) => (
              <Input
                key={field}
                name={field}
                register={register}
                design={design}
                placeholder={field.replace(/([A-Z])/g, " $1")}
              />
            ))}
          </div>

          <CheckboxGroup
            label="Staff Needed"
            options={staffNeeded}
            register={register}
            field="staffNeeded"
            defaultValues={job?.staffNeeded}
          />
          {/* otherStaff */}
          {staffNeeded.includes("Other") && (
            // otherStaff Field
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Staff Details
              </label>
              <input
                type="text"
                value={job?.otherStaff}
                {...register("otherStaff")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md max-w-[350px]"
                placeholder="Please specify the other staff type"
              />
            </div>
          )}


          <CheckboxGroup
            label="Shifts Needed"
            options={shifts}
            register={register}
            field="shiftsNeeded"
            defaultValues={job?.shiftsNeeded}
          />
          <textarea
            {...register("additionalNotes")}
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Write additional information here..."
          ></textarea>
          <h2 className="text-xl font-semibold">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Facility Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Facility Type*
              </label>
              <select
                {...register("jobFacilityType")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select job facility type</option>
                {facilityData.map((type, index) => (
                  <option key={index} value={type.label}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Facility Role*
              </label>
              <select
                {...register("jobFacilityRole")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                disabled={!selectedJobFacility}
              >
                <option value="">Select job facility role</option>
                {selectedJobFacility?.options.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              {/* Negotiable Checkbox */}
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register("salaryNegotiable")}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Salary is negotiable
                  </span>
                </label>
              </div>
              {/* Conditional Salary Inputs */}
              {isNegotiable ? (
                // Negotiable Field
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Negotiation Details*
                  </label>
                  <input
                    type="text"
                    {...register("negotiationNote")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Open to negotiation"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-5 flex-wrap">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Salary*
                    </label>
                    <input
                      type="number"
                      {...register("minSalary")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md "
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Salary*
                    </label>
                    <input
                      type="number"
                      {...register("maxSalary")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md "
                    />
                  </div>

                  {/* Salary Type Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Type*
                    </label>
                    <select
                      {...register("salaryType", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select type</option>
                      <option value="hourly">Hourly</option>
                      <option value="weekly">Weekly</option>
                      <option value="per_diem">Per Diem</option>
                      <option value="full_time">Full-Time</option>
                      <option value="part_time">Part-Time</option>
                      <option value="temporary">Temporary</option>
                    </select>
                    {errors.salaryType && (
                      <p className="text-sm text-red-500">
                        Salary type is required
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            {/* Job Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Summary*
              </label>
              <textarea
                {...register("jobSummary")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                placeholder="Write a brief job summary..."
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between gap-6 flex-wrap">
              {/* Key Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Responsibilities*
                </label>
                {keyResponsibilitiesFields.map((field, index) => (
                  <div key={field.id} className="flex items-center mb-2">
                    <input
                      {...register(`keyResponsibilities.${index}.value` as const)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => keyResponsibilitiesRemove(index)}
                      className="ml-2 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                      aria-label="Remove responsibility"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => keyResponsibilitiesAppend({ value: "" })}
                  className="px-4 py-2 btn2 rounded transition"
                >
                  Add Responsibility
                </button>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualifications*
                </label>
                {qualificationsFields.map((field, index) => (
                  <div key={field.id} className="flex items-center mb-2">
                    <input
                      {...register(`qualifications.${index}.value` as const)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                      placeholder={`Qualification ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => qualificationsRemove(index)}
                      className="ml-2 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                      aria-label="Remove qualification"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => qualificationsAppend({ value: "" })}
                  className="px-4 py-2 btn2 rounded transition"
                >
                  Add Qualification
                </button>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits*
                </label>
                {benefitsFields.map((field, index) => (
                  <div key={field.id} className="flex items-center mb-2">
                    <input
                      {...register(`benefits.${index}.value` as const)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                      placeholder={`Benefit ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => benefitsRemove(index)}
                      className="ml-2 px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                      aria-label="Remove benefit"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => benefitsAppend({ value: "" })}
                  className="px-4 py-2 btn2 rounded transition"
                >
                  Add Benefit
                </button>
              </div>
            </div>

            {/* UCL Overview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UCL Overview*
              </label>
              <textarea
                {...register("uclOverview", { required: "UCL Overview is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                placeholder="Write an overview of UCL..."
                rows={4}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 accent-bg-color rounded-lg hover:bg-yellow-500 transition flex justify-center items-center font-medium cursor-pointer"
          >
            {isLoading ? (
              <div className="">
                <span>Saveing...</span>
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            ) : (
              "Save Data"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckboxGroup = ({
  label,
  options,
  register,
  field,
  defaultValues,
}: any) => (
  <div>
    <label className="block font-medium mb-2 text-gray-700">{label}</label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((option: any) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={option}
            {...register(field)}
            className="checkbox checkbox-sm"
            defaultChecked={defaultValues?.includes(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default ClientForm;
