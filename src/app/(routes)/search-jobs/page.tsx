"use client";

import JobCard from "@/components/jobcard/JobCard";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";
import { useState } from "react";
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

const JobsPage = () => {
  const [selectedFacilityType, setSelectedFacilityType] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleReset = () => {
    setSelectedFacilityType("");
    setSelectedRole("");
    setSelectedJobType("");
    setSelectedCity("");
    setShowFilter(false);
  };

  const selectedFacility = facilities.find(
    (f) => f.label === selectedFacilityType
  );

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const jobTypes = [
    "Hourly",
    "Weekly",
    "Per Diem",
    "Full-Time",
    "Part-Time",
    "Temporary",
  ];

  const data = {
    selectedFacilityType,
    selectedRole,
    selectedJobType,
    selectedCity,
  };

  return (
    <section>
      <div className="second-bg-color ">
        <div className=" py-4 md:py-8 max-w-[1440px] w-11/12 mx-auto">
          <FilterSidebar
            handleReset={handleReset}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            cities={cities}
            selectedFacility={selectedFacility}
            selectedFacilityType={selectedFacilityType}
            setSelectedFacilityType={setSelectedFacilityType}
            facilities={facilities}
            jobTypes={jobTypes}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedJobType={selectedJobType}
            setSelectedJobType={setSelectedJobType}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>
      </div>

      <div className="max-w-[1440px] w-11/12 mx-auto gap-6 py-12 md:py-20">
        <JobCard data={data} />
      </div>
    </section>
  );
};

export default JobsPage;
