"use client";

import { useForm, useWatch } from "react-hook-form";
import Input from "../ui/inputs/Input";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import BackBtn from "../ui/btns/backBtn/BackBtn";
import { label } from "framer-motion/client";

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
    label: 'Transportation',
    options: [
      "Non-Emergency Medical Transportation (NEMT)",
      "Emergency Medical Services (EMS)",
      'Staff Transportation',
      'Interfacility Transport (IFT)',
      "Medical Courier Services",
      "Mobile Clinics/Vehicles",
      "Patient Discharge Transportation",
      "Home Health Visit Transportation",
      "Medical Equipment Delivery Vehicles",
      "Specialty Transport (e.g., neonatal or bariatric)",
      "Air Ambulance",
      "Shuttle Services (internal or external)",
      "On-demand Ride Services (e.g., Uber Health, Lyft Concierge)",
      "Volunteer Driver Programs",
      "Dial-a-Ride Services",
    ]
  }
];

const shifts = ["Day", "Evening", "Night", "Weekends", "Flexible"];

const ClientForm = ({ job }: any) => {

  const { register, handleSubmit, control, formState: { errors } } = useForm({
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
      // additionsal_start
      jobFacilityType:  job?.jobFacilityType,
      jobFacilityRole: job?.jobFacilityRole,
      minSalary: job?.minSalary,
      maxSalary: job?.maxSalary,
      negotiationNote: job?.negotiationNote,
      salaryNegotiable: job.salaryNegotiable,
      salaryType: job?.salaryType,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  // const onSubmit = async (data: any) => {
  //   setIsLoading(true);
  //   try {
  //     const schema = {
  //       jobId: job?._id,
  //       institutionalEmail: data?.institutionalEmail,
  //       jobInfo: {
  //         facilityName: data?.facilityName,
  //         facilityType: data?.facilityType,
  //         additionalInfo: {
  //           medicalDiagnostic: data?.medicalDiagnostic,
  //           labDiagnostic: data?.labDiagnostic,
  //           nursing: data?.nursing,
  //           pharmacy: data?.pharmacy,
  //           mentalBehavioral: data?.mentalBehavioral,
  //           alliedHealth: data?.alliedHealth,
  //           dentalSupport: data?.dentalSupport,
  //           publicHealthAdmin: data?.publicHealthAdmin,
  //           emergencyField: data?.emergencyField,
  //           directPatientCare: data?.directPatientCare,
  //         },
  //       },
  //       location: {
  //         address: data?.address,
  //         city: data?.city,
  //         state: data?.state,
  //         zipCode: data?.zipCode,
  //       },
  //       contacts: {
  //         contactName: data?.contactName,
  //         contactEmail: data?.contactEmail,
  //         contactPhone: data?.contactPhone,
  //       },
  //       salary: {
  //         minSalary: data?.minSalary,
  //         maxSalary: data?.maxSalary,
  //       },
  //       shiftsNeeded: data.shiftsNeeded || [],
  //       staffNeeded: data?.staffNeeded || [],
  //       startDate: data?.startDate,
  //       numberOfPositions: data?.numberOfPositions,
  //       assignmentDuration: data?.assignmentDuration,
  //       additionalNotes: data?.additionalNotes,
  //     };
  //     if (data?.maxSalary < data?.minSalary) {
  //       swal({ title: "Max is less than min salary", icon: "warning" });
  //     } else {
  //       const response = await axios.post(
  //         "/pages/api/admin/job/update",
  //         schema
  //       );
  //       if (response?.data?.success) {
  //         swal({ title: response?.data?.message, icon: "success" });
  //       } else {
  //         swal({ title: response?.data?.message, icon: "warning" });
  //       }
  //     }
  //   } catch (error: any) {
  //     swal({ title: error.message || "Something went wrong", icon: "error" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const design = "input input-bordered w-full";

  // Watch the selected Job facility  type
  const selectedFacilityLabel = useWatch({
    control,
    name: 'jobFacilityType',
  })

  // Salary Negotiable
  const isNegotiable = useWatch({
    control,
    name: 'salaryNegotiable',
  })

  // Get the matching role options based on selected label
  const selectedJobFacility = facilityData.find(
    (item) => item.label === selectedFacilityLabel
  )

  const onSubmit = (data: any) => {
    console.log(data)
  }


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
          <div className="grid grid-cols-2 gap-5">
            {/* Facility Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Facility Type*
              </label>
              <select
                {...register("jobFacilityType")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
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
                Job  Facility Role*
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
                <div className="flex items-center gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Salary*
                    </label>
                    <input
                      type="number"
                      {...register("minSalary",)}
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
                    </select>
                    {errors.salaryType && (
                      <p className="text-sm text-red-500">Salary type is required</p>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 accent-bg-color text-white rounded-lg hover:bg-yellow-500 transition flex justify-center items-center"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Submit"
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