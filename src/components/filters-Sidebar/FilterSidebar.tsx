"use client";
import React, { useState } from "react";
import { FiFilter, FiRefreshCw } from "react-icons/fi";

const cities = ["New York", "Los Angeles", "Chicago"];
const jobTypes = ["Full-Time", "Part-Time", "Contract", "Temporary"];
const facilities = [
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
      "Specialty Transport (neonatal or bariatric)",
      "Air Ambulance",
      "Shuttle Services (internal or external)",
      "On-demand Ride Services (Uber Health, Lyft Concierge)",
      "Volunteer Driver Programs",
      "Dial-a-Ride Services",
    ]
  }
];



export default function FilterSidebar({ jobs }: { jobs: any }) {


  const [filters, setFilters] = useState({
    location: "",
    facilityType: "",
    jobType: "",
    role: "",
  });
  const [showFilter, setShowFilter] = useState(false);


  const handleReset = () => {
    setFilters({
      location: "",
      facilityType: "",
      jobType: "",
      role: "",
    });
  };

  return (
    <div className="relative p-4">
      <div className="flex items-center justify-between">
        <button
          className="text-white cursor-pointer px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FiFilter />
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <button
          className="text-white cursor-pointer px-4 py-2 rounded flex items-center gap-2"
          onClick={handleReset}
        >
          <FiRefreshCw />
          Reset All
        </button>
      </div>

      {showFilter && (
        <div className="bg-gray-100 p-4 mt-4 rounded space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              name="location"
              list="city-options"
              value=''
              className="w-full p-2 rounded"
              placeholder="Type or select a city"
            />
            <datalist id="city-options">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          {/* Facility Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Facility Type*
            </label>
            <select

              className="w-full px-4 py-2 border border-gray-300 rounded-md "
            >
              <option value="">Select job facility type</option>
              {facilities.map((type, index) => (
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

              className="w-full px-4 py-2 border border-gray-300 rounded-md "
     
            >
              <option value="">Select job facility role</option>
              {/* {selectedJobFacility?.options.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))} */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Job Type</label>
            <select
              name="jobType"
              className="w-full p-2 rounded"
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

        </div>
      )}
    </div>
  );
}
