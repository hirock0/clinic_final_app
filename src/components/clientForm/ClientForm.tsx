"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/inputs/Input";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const roles = [
  "Registered Nurse (RN)",
  "Licensed Practical Nurse (LPN)",
  "Certified Nursing Assistant (CNA)",
  "Medical Assistant",
  "Physician",
  "Therapist",
  "Other",
];

const shifts = ["Day", "Evening", "Night", "Weekends", "Flexible"];

const ClientForm = ({ job }: { job: any }) => {
  const { register, handleSubmit } = useForm({ defaultValues: job });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/pages/api/admin/job/update", data);
      if (response?.data?.success) {
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
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const design = "input input-bordered w-full";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 mt-10 bg-white p-6 md:p-10 rounded-xl shadow-lg"
    >
      {/* Left side */}
      <div className="w-full lg:w-2/3 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update Job Posting
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="facilityName" register={register} design={design} />
          <Input name="facilityType" register={register} design={design} />
          <Input name="address" register={register} design={design} />
          <Input name="city" register={register} design={design} />
          <Input name="state" register={register} design={design} />
          <Input name="zipCode" register={register} design={design} />
          <Input name="contactName" register={register} design={design} />
          <Input name="contactEmail" register={register} design={design} />
          <Input name="contactPhone" register={register} design={design} />
          <Input name="numberOfPositions" register={register} design={design} />
          <Input name="startDate" register={register} design={design} />
          <Input
            name="assignmentDuration"
            register={register}
            design={design}
          />
        </div>

        {/* Staff Needed */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Staff Needed
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {roles.map((role) => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={role}
                  {...register("staffNeeded")}
                  className="checkbox checkbox-sm"
                  defaultChecked={job?.staffNeeded?.includes(role)}
                />
                <span>{role}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Shifts */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Shifts Needed
          </label>
          <div className="flex flex-wrap gap-4">
            {shifts.map((shift) => (
              <label key={shift} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={shift}
                  {...register("shiftsNeeded")}
                  className="checkbox checkbox-sm"
                  defaultChecked={job?.shiftsNeeded?.includes(shift)}
                />
                <span>{shift}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Additional Notes
          </label>
          <textarea
            {...register("additionalNotes")}
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Write additional information here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/3 space-y-4">
        {[
          {
            name: "medicalRole",
            label: "Medical Professional Role",
            options: [
              "Doctor (MD/DO)",
              "Physician Assistant (PA)",
              "Nurse Practitioner (NP)",
              "Clinical Nurse Specialist (CNS)",
              "Anesthesiologist Assistant",
              "Radiologist",
              "Pathologist",
              "Dentist (DDS/DMD)",
              "Optometrist (OD)",
              "Podiatrist (DPM)",
              "Chiropractor (DC)",
            ],
          },
          {
            name: "labRole",
            label: "Diagnostic & Lab Professional Role",
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
            name: "nursingRole",
            label: "Nursing Professional Role",
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
            name: "pharmacyRole",
            label: "Pharmacy & Medication Role",
            options: ["Pharmacist (PharmD)", "Pharmacy Technician"],
          },
          {
            name: "psychiatrist",
            label: "Psychiatrist",
            options: ["Psychiatrist (MD)"],
          },
          {
            name: "psychologist",
            label: "Psychologist",
            options: ["Psychologist (PhD/PsyD)"],
          },
          {
            name: "lcsw",
            label: "Licensed Clinical Social Worker",
            options: ["Licensed Clinical Social Worker (LCSW)"],
          },
          {
            name: "mft",
            label: "Marriage & Family Therapist",
            options: ["Marriage & Family Therapist (MFT)"],
          },
        ].map(({ name, label, options }) => (
          <div key={name}>
            <label className="block font-medium mb-2 text-gray-700">
              {label}
            </label>
            <select
              {...register(name)}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option disabled value="">
                Select option
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </form>
  );
};

export default ClientForm;
