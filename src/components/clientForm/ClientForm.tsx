"use client";

import { useForm } from "react-hook-form";
import Input from "../ui/inputs/Input";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import BackBtn from "../ui/btns/backBtn/BackBtn";

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
      console.log(data?.maxSalary);
      console.log(data?.minSalary);
      if (Number(data?.minSalary) > Number(data?.maxSalary)) {
        swal({
          title: "Min Salary must be less than Max Salary",
          icon: "warning",
        });
      } else {
        if (data?.minSalary === "" || data?.maxSalary === "") {
          swal({
            title: "Salary must be added",
            icon: "warning",
          });
        } else {
          const response = await axios.post(
            "/pages/api/admin/job/update",
            data
          );
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
        }
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
    <div className="py-10">
      <div className=" max-w-[1440px] w-11/12 mx-auto">
        <div className="">
          <BackBtn />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex max-md:flex-col gap-5"
        >
          {/* Left side */}
          <div className="w-full space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Update Job Posting
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="facilityName"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="facilityType"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="address"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="city"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="state"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="zipCode"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="contactName"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="contactEmail"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="contactPhone"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="numberOfPositions"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="startDate"
                register={register}
                design={design}
                placeholder={""}
              />
              <Input
                name="assignmentDuration"
                register={register}
                design={design}
                placeholder={""}
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
              className="w-full max-md:hidden py-3 accent-bg-color text-white rounded-lg hover:bg-yellow-500 transition flex justify-center items-center"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm text-white"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {/* Right side */}

          <div className=" md:w-2/3">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Additional Informations
            </h1>
            <div className="w-full  mt-6 space-y-4">
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
              <div className="">
                <Input
                  name="minSalary"
                  register={register}
                  design={design}
                  placeholder="MinSalary"
                />
                <Input
                  name="maxSalary"
                  register={register}
                  design={design}
                  placeholder="MaxSalary"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:hidden py-3 accent-bg-color text-white rounded-lg hover:bg-yellow-500 transition flex justify-center items-center"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm text-white"></span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
