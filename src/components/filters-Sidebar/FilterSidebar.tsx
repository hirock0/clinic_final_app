'use client';

import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const FilterSidebar = () => {
  return (
    <section className="max-w-[1440px] w-11/12 mx-auto gap-6 mt-8">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold flex items-center third-text-color">
          <FiFilter className="mr-2" /> Filter Jobs
        </h3>
        <button className="text-sm text-red-500 hover:text-red-700 flex items-center cursor-pointer main-bg-color px-4 py-2 rounded-full">
          <FiX className="mr-1" /> Reset All
        </button>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
   
        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Facility Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Types</option>
            <option value="Hospital">Hospital</option>
            <option value="Clinic">Clinic</option>
            <option value="Rehabilitation Center">Rehabilitation Center</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Location</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Locations</option>
            <option value="Dhaka, Bangladesh">Dhaka, Bangladesh</option>
            <option value="Chittagong, Bangladesh">Chittagong, Bangladesh</option>
            <option value="Sylhet, Bangladesh">Sylhet, Bangladesh</option>
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Shift</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Shifts</option>
            <option value="Day">Day</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Start After</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color"
          />
        </div>


        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Medical & Diagnostic Professionals</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Roles</option>
            <option value="Doctor (MD/DO)">Doctor (MD/DO)</option>
            <option value="Physician Assistant (PA)">Physician Assistant (PA)</option>
            <option value="Nurse Practitioner (NP)">Nurse Practitioner (NP)</option>
            <option value="Clinical Nurse Specialist (CNS)">Clinical Nurse Specialist (CNS)</option>
            <option value="Anesthesiologist Assistant">Anesthesiologist Assistant</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Dentist (DDS/DMD)">Dentist (DDS/DMD)</option>
            <option value="Optometrist (OD)">Optometrist (OD)</option>
            <option value="Podiatrist (DPM)">Podiatrist (DPM)</option>
            <option value="Chiropractor (DC)">Chiropractor (DC)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Diagnostic & Lab Professionals</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Roles</option>
            <option value="Medical Laboratory Scientist">Medical Laboratory Scientist</option>
            <option value="Phlebotomist">Phlebotomist</option>
            <option value="Radiologic Technologist">Radiologic Technologist</option>
            <option value="Ultrasound Technician">Ultrasound Technician</option>
            <option value="MRI/CT Technologist">MRI/CT Technologist</option>
            <option value="Nuclear Medicine Technologist">Nuclear Medicine Technologist</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Nursing Professionals</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Roles</option>
            <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
            <option value="Licensed Practical/Vocational Nurse (LPN/LVN)">Licensed Practical/Vocational Nurse (LPN/LVN)</option>
            <option value="Certified Nursing Assistant (CNA)">Certified Nursing Assistant (CNA)</option>
            <option value="School Nurse">School Nurse</option>
            <option value="Travel Nurse">Travel Nurse</option>
            <option value="Dialysis Nurse">Dialysis Nurse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Pharmacy & Medication</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Roles</option>
            <option value="Pharmacist (PharmD)">Pharmacist (PharmD)</option>
            <option value="Pharmacy Technician">Pharmacy Technician</option>
          </select>
        </div>

    
        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Mental & Behavioral Health</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color">
            <option value="">All Roles</option>
            <option value="Psychiatrist (MD)">Psychiatrist (MD)</option>
            <option value="Psychologist (PhD/PsyD)">Psychologist (PhD/PsyD)</option>
            <option value="Licensed Clinical Social Worker (LCSW)">Licensed Clinical Social Worker (LCSW)</option>
            <option value="Marriage & Family Therapist (MFT)">Marriage & Family Therapist (MFT)</option>
            <option value="Mental Health Counselor">Mental Health Counselor</option>
            <option value="Substance Abuse Counselor">Substance Abuse Counselor</option>
            <option value="Behavioral Technician (ABA Tech)">Behavioral Technician (ABA Tech)</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default FilterSidebar;
