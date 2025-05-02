"use client";
import axios from "axios";
import React, { useState } from "react";

const HireTalentPage = () => {
  const [formData, setFormData] = useState<{
    facilityName: string;
    facilityType: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    staffNeeded: string[];
    otherStaff: string;
    numberOfPositions: string;
    shiftsNeeded: string[];
    startDate: string;
    assignmentDuration: string;
    additionalNotes: string;
  }>({
    facilityName: "",
    facilityType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    staffNeeded: [],
    otherStaff: "",
    numberOfPositions: "",
    shiftsNeeded: [],
    startDate: "",
    assignmentDuration: "",
    additionalNotes: "",
  });

  const facilityTypes = [
    "Hospital",
    "Clinic",
    "Long-Term Care Facility",
    "Rehabilitation Center",
    "Urgent Care",
    "Other",
  ];

  const staffTypes = [
    "Registered Nurse (RN)",
    "Licensed Practical Nurse (LPN)",
    "Certified Nursing Assistant (CNA)",
    "Medical Assistant",
    "Physician",
    "Therapist",
    "Other",
  ];

  const shiftOptions = ["Day", "Evening", "Night", "Weekends", "Flexible"];

  const durationOptions = [
    "Per Diem",
    "Temporary (1-12 weeks)",
    "Temporary (13-26 weeks)",
    "Permanent",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox" && name in formData) {
      const updatedArray = checked
        ? [...(formData[name as keyof typeof formData] as string[]), value]
        : (formData[name as keyof typeof formData] as string[]).filter(
            (item) => item !== value
          );

      setFormData((prev) => ({ ...prev, [name]: updatedArray }));
    } else if (name in formData) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/pages/api/jobs", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 rounded-lg shadow-md my-12 md:my-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Healthcare Facility Staffing Request Form
      </h1>
      <p className="text-gray-600 mb-6">
        Please complete the form below to request qualified healthcare staff for
        your facility. A member of our team will contact you shortly to confirm
        details.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Facility Information Section */}
        <div className="border-b border-gray-200 pb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Facility Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facility Name*
              </label>
              <input
                type="text"
                name="facilityName"
                value={formData.facilityName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facility Type*
              </label>
              <select
                name="facilityType"
                value={formData.facilityType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              >
                <option value="">Select facility type</option>
                {facilityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State/Province*
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP/Postal Code*
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Contact Name*
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email*
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone Number*
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>
          </div>
        </div>

        {/* Staffing Request Details Section */}
        <div className="border-b border-gray-200 pb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Staffing Request Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type of Staff Needed (Select all that apply)*
              </label>
              <div className="space-y-2">
                {staffTypes.map((staff) => (
                  <div key={staff} className="flex items-center">
                    <input
                      type="checkbox"
                      id={staff}
                      name="staffNeeded"
                      value={staff}
                      checked={formData.staffNeeded.includes(staff)}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={staff}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {staff}
                    </label>
                  </div>
                ))}
              </div>
              {formData.staffNeeded.includes("Other") && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="otherStaff"
                    value={formData.otherStaff}
                    onChange={handleChange}
                    placeholder="Please specify"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Positions*
                </label>
                <input
                  type="number"
                  name="numberOfPositions"
                  value={formData.numberOfPositions}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md "
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Shift(s) Needed (Select all that apply)*
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {shiftOptions.map((shift) => (
                  <div key={shift} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`shift-${shift}`}
                      name="shiftsNeeded"
                      value={shift}
                      checked={formData.shiftsNeeded.includes(shift)}
                      onChange={handleChange}
                      className="h-4 w-4  border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`shift-${shift}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {shift}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Duration*
              </label>
              <select
                name="assignmentDuration"
                value={formData.assignmentDuration}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              >
                <option value="">Select duration</option>
                {durationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Requirements or Notes
              </label>
              <textarea
                name="additionalNotes"
                rows={4}
                value={formData.additionalNotes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 second-bg-color text-white font-medium rounded-md transition-transform duration-300 hover:scale-105 ease-in-out cursor-pointer"
          >
            Submit Request
          </button>
        </div>
      </form>
    </section>
  );
};

export default HireTalentPage;
