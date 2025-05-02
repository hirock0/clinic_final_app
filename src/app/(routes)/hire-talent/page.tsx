<<<<<<< HEAD
"use client";
import axios from "axios";
import React, { useState } from "react";
=======
'use client'
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
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
}
>>>>>>> 7d6d7070eed4ca2eccc090b4857c5a3746dcc87c

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

<<<<<<< HEAD
  const facilityTypes = [
    "Hospital",
    "Clinic",
    "Long-Term Care Facility",
    "Rehabilitation Center",
    "Urgent Care",
    "Other",
  ];
=======
    //react hook form
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>()
>>>>>>> 7d6d7070eed4ca2eccc090b4857c5a3746dcc87c

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

<<<<<<< HEAD
  const durationOptions = [
    "Per Diem",
    "Temporary (1-12 weeks)",
    "Temporary (13-26 weeks)",
    "Permanent",
    "Other",
  ];
=======
    const shiftOptions = [
        'Day',
        'Evening',
        'Night',
        'Weekends',
        'Flexible'
    ];
    const staffNeeded = watch('staffNeeded') || [];
>>>>>>> 7d6d7070eed4ca2eccc090b4857c5a3746dcc87c

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

<<<<<<< HEAD
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
=======

    const onSubmit = async (data: FormValues) => {
        
        console.log(data)
        try {
            await axios.post('/pages/api/jobs', data,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }finally{
            reset();
        }

       
    };
>>>>>>> 7d6d7070eed4ca2eccc090b4857c5a3746dcc87c

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Facility Information Section */}
        <div className="border-b border-gray-200 pb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Facility Information
          </h2>

<<<<<<< HEAD
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
=======
    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md my-12 md:my-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Healthcare Facility Staffing Request Form</h1>
            <p className="text-gray-600 mb-6">
                Please complete the form below to request qualified healthcare staff for your facility.
                A member of our team will contact you shortly to confirm details.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Facility Information Section */}
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Facility Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facility Name*</label>
                            <input
                                type="text"
                                {...register('facilityName', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.facilityName && <span className='text-red-500 text-sm'>Facility Name Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facility Type*</label>
                            <select
                                {...register('facilityType', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            >
                                <option value="">Select facility type</option>
                                {facilityTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.facilityType && <span className='text-red-500 text-sm'>Facility Type Required</span>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                            <input
                                type="text"
                                {...register('address', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.address && <span className='text-red-500 text-sm'>Address Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                            <input
                                type="text"
                                {...register('city', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.city && <span className='text-red-500 text-sm'>City Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province*</label>
                            <input
                                type="text"
                                {...register('state', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.state && <span className='text-red-500 text-sm'>State Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code*</label>
                            <input
                                type="text"
                                {...register('zipCode', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.zipCode && <span className='text-red-500 text-sm'>ZIP/Postal Code Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Name*</label>
                            <input
                                type="text"
                                {...register('contactName', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.contactName && <span className='text-red-500 text-sm'>Contact Name Required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email*</label>
                            <input
                                type="email"
                                {...register('contactEmail', {
                                    required: true,
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.contactEmail && (
                                <span className='text-red-500 text-sm'>Please enter a valid email</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone Number*</label>
                            <input
                                type="tel"
                                {...register('contactPhone', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                            {errors.contactPhone && <span className='text-red-500 text-sm'>Contact Phone Number Required</span>}
                        </div>
                    </div>
                </div>

                {/* Staffing Request Details Section */}
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Staffing Request Details</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Type of Staff Needed (Select all that apply)*</label>
                            <div className="space-y-2">
                                {staffTypes.map(staff => (
                                    <div key={staff} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={staff}
                                            value={staff}
                                            {...register('staffNeeded', { validate: value => value && value.length > 0 ? true : 'Please select at least one staff type' })}
                                            className="h-4 w-4 border-gray-300 rounded"
                                        />
                                        <label htmlFor={staff} className="ml-2 text-sm text-gray-700">
                                            {staff}
                                        </label>
                                    </div>
                                ))}
                                {errors.staffNeeded && (
                                    <span className="text-red-500 text-sm">{errors.staffNeeded.message}</span>
                                )}
                            </div>
                            {staffNeeded.includes('Other') && (
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        {...register('otherStaff', { required: 'Please specify the other staff type' })}
                                        placeholder="Please specify"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md "
                                    />
                                </div>
                            )}
                            {errors.otherStaff && (
                                <span className="text-red-500 text-sm">{errors.otherStaff.message}</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Positions*</label>
                                <input
                                    type="number"
                                    {...register('numberOfPositions', { required: true, min: 1 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
                                <input
                                    type="date"
                                    {...register('startDate', { required: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Shift(s) Needed (Select all that apply)*</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {shiftOptions.map(shift => (
                                    <div key={shift} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`shift-${shift}`}
                                            value={shift}
                                            {...register('shiftsNeeded', { validate: (value, formValues) => (formValues.shiftsNeeded?.length ?? 0) > 0 || 'Please select at least one shift' })}
                                            className="h-4 w-4  border-gray-300 rounded"
                                        />
                                        <label htmlFor={`shift-${shift}`} className="ml-2 text-sm text-gray-700">
                                            {shift}
                                        </label>
                                    </div>
                                ))}
                                {errors.shiftsNeeded && (
                                    <span className="text-red-500 text-sm">{errors.shiftsNeeded.message}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Duration*</label>
                            <select
                                {...register('assignmentDuration', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            >
                                <option value="">Select duration</option>
                                {durationOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements or Notes</label>
                            <textarea
                                rows={4}
                                {...register('additionalNotes')}
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
>>>>>>> 7d6d7070eed4ca2eccc090b4857c5a3746dcc87c
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
<<<<<<< HEAD
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
=======
            </form>
        </div>
    );
>>>>>>> 7d6d7070eed4ca2eccc090b4857c5a3746dcc87c
};

export default HireTalentPage;
