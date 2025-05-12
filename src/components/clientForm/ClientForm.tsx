"use client";

import { useForm } from "react-hook-form";
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

const shifts = ["Day", "Evening", "Night", "Weekends", "Flexible"];

const ClientForm = ({ job }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      facilityName: job?.jobInfo?.facilityName,
      facilityType: job?.jobInfo?.facilityType,
      contactName: job?.contacts?.contactName,
      contactEmail: job?.contacts?.contactEmail,
      contactPhone: job?.contacts?.contactPhone,
      address: job?.location?.address,
      city: job?.location?.city,
      state: job?.location?.state,
      zipCode: job?.location?.zipCode,
      startDate: job?.startDate,
      numberOfPositions: job?.numberOfPositions,
      assignmentDuration: job?.assignmentDuration,
      additionalNotes: job?.additionalNotes,
      institutionalEmail: job?.institutionalEmail,
      approvedStatus: job?.approvedStatus,
      shiftsNeeded: job?.shiftsNeeded || [],
      staffNeeded: job?.staffNeeded || [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const schema = {
        jobId: job?._id,
        institutionalEmail: data?.institutionalEmail,
        jobInfo: {
          facilityName: data?.facilityName,
          facilityType: data?.facilityType,
          additionalInfo: {
            medicalDiagnostic: data?.medicalDiagnostic,
            labDiagnostic: data?.labDiagnostic,
            nursing: data?.nursing,
            pharmacy: data?.pharmacy,
            mentalBehavioral: data?.mentalBehavioral,
            alliedHealth: data?.alliedHealth,
            dentalSupport: data?.dentalSupport,
            publicHealthAdmin: data?.publicHealthAdmin,
            emergencyField: data?.emergencyField,
            directPatientCare: data?.directPatientCare,
          },
        },
        location: {
          address: data?.address,
          city: data?.city,
          state: data?.state,
          zipCode: data?.zipCode,
        },
        contacts: {
          contactName: data?.contactName,
          contactEmail: data?.contactEmail,
          contactPhone: data?.contactPhone,
        },
        shiftsNeeded: data.shiftsNeeded || [],
        staffNeeded: data?.staffNeeded || [],
        startDate: data?.startDate,
        numberOfPositions: data?.numberOfPositions,
        assignmentDuration: data?.assignmentDuration,
        additionalNotes: data?.additionalNotes,
      };
      const response = await axios.post("/pages/api/admin/job/update", schema);
      if (response?.data?.success) {
        swal({ title: response?.data?.message, icon: "success" });
      } else {
        swal({ title: response?.data?.message, icon: "warning" });
      }
    } catch (error: any) {
      swal({ title: error.message || "Something went wrong", icon: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const design = "input input-bordered w-full";

  return (
    <div className="py-10">
      <div className="max-w-[1440px] w-11/12 mx-auto">
        <BackBtn />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Update Job Posting
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className=" grid grid-cols-2 gap-5">
            {additionalInfoFields.map(
              ({ name, label, options }: any, idx: any) => (
                <div
                  className=" flex flex-col border p-3 rounded-3xl shadow-2xl hover:scale-105"
                  key={idx}
                >
                  <label htmlFor={name}>{label}</label>
                  <select id={name} {...register(name)}>
                    <option value="N/A" className="">
                      Select One
                    </option>
                    {options?.map((item: any, index: any) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition flex justify-center items-center"
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

const additionalInfoFields = [
  {
    name: "medicalDiagnostic",
    label: "Medical & Diagnostic Professionals",
    options: [
      "Doctor (MD/DO) – Physicians in various specialties (e.g., cardiologist, surgeon, pediatrician)",
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
    name: "labDiagnostic",
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
    name: "nursing",
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
    name: "pharmacy",
    label: "Pharmacy & Medication",
    options: ["Pharmacist (PharmD)", "Pharmacy Technician"],
  },
  {
    name: "mentalBehavioral",
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
    name: "alliedHealth",
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
    name: "dentalSupport",
    label: "Dental Support Staff",
    options: ["Dental Hygienist", "Dental Assistant", "Dental Lab Technician"],
  },
  {
    name: "publicHealthAdmin",
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
    name: "emergencyField",
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
    name: "directPatientCare",
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
];

export default ClientForm;
