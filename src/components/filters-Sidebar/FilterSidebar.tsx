"use client";
import React, { useState, useEffect } from "react";
import { FiFilter, FiRefreshCw } from "react-icons/fi";
import ViewJobs from "../viewjobs/ViewJobs";

const cities = ["New York", "Los Angeles", "Chicago"];
const facilities = ["Hospital", "Clinic", "Private Practice"];
const jobTypes = ["Full-Time", "Part-Time", "Contract", "Temporary"];

const roleGroups = [
  {
    name: "medicalRole",
    label: "Medical Professional Role",
    options: [
      "Doctor (MD/DO)",
      "Physician Assistant (PA)",
      "Nurse Practitioner (NP)",
    ],
  },
  {
    name: "nursingRole",
    label: "Nursing Role",
    options: [
      "Registered Nurse (RN)",
      "Licensed Practical Nurse (LPN)",
      "Certified Nursing Assistant (CNA)",
    ],
  },
  {
    name: "labRole",
    label: "Laboratory Role",
    options: ["Medical Technologist", "Phlebotomist", "Pathologist"],
  },
  {
    name: "pharmacyRole",
    label: "Pharmacy Role",
    options: ["Pharmacist", "Pharmacy Technician"],
  },
  {
    name: "psychiatrist",
    label: "Psychiatrist Role",
    options: ["Adult Psychiatrist", "Child Psychiatrist"],
  },
  {
    name: "psychologist",
    label: "Psychologist Role",
    options: ["Clinical Psychologist", "Neuropsychologist"],
  },
  {
    name: "lcsw",
    label: "LCSW Role",
    options: ["Clinical Social Worker", "School Social Worker"],
  },
  {
    name: "mft",
    label: "Marriage & Family Therapist Role",
    options: ["MFT", "Couples Therapist"],
  },
];

export default function FilterSidebar({ jobs }: { jobs: any }) {
  const [filters, setFilters] = useState({
    location: "",
    facilityType: "",
    jobType: "",
    role: "",
  });

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [view, setView] = useState<any>(null);

  const viewDetails = (job: any) => {
    setView(job);
  };

  const handleReset = () => {
    setFilters({
      location: "",
      facilityType: "",
      jobType: "",
      role: "",
    });
  };

  useEffect(() => {
    const hasActiveFilter = Object.values(filters).some(
      (value) => value !== ""
    );
    setFilteredJobs(hasActiveFilter ? filterJobs(jobs, filters) : []);
  }, [filters]);

  const filterJobs = (jobs: any, filters: any) => {
    return jobs.filter((job: any) => {
      if (filters.location && job.city !== filters.location) return false;
      if (filters.facilityType && job.facilityType !== filters.facilityType)
        return false;
      if (filters.jobType && job.jobType !== filters.jobType) return false;
      if (filters.role && !job.staffNeeded.includes(filters.role)) return false;
      return true;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const allRoles = roleGroups.flatMap((group) => group.options);

  return (
    <div className="relative p-4">
      <div className="flex items-center justify-between">
        <button
          className="text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FiFilter />
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <button
          className="text-white px-4 py-2 rounded flex items-center gap-2"
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
              value={filters.location}
              onChange={handleChange}
              className="w-full p-2 rounded"
              placeholder="Type or select a city"
            />
            <datalist id="city-options">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>


          <div>
            <label className="block text-sm font-semibold mb-1">
              Facility Type
            </label>
            <select
              name="facilityType"
              onChange={handleChange}
              value={filters.facilityType}
              className="w-full p-2 rounded"
            >
              <option value="">Select Facility</option>
              {facilities.map((facility, index) => (
                <option key={index} value={facility}>
                  {facility}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Job Type</label>
            <select
              name="jobType"
              onChange={handleChange}
              value={filters.jobType}
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

  
          <div>
            <label className="block text-sm font-semibold mb-1">Role</label>
            <select
              name="role"
              onChange={handleChange}
              value={filters.role}
              className="w-full p-2 rounded"
            >
              <option value="">Select Role</option>
              {allRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Matched Jobs</h2>
        {filteredJobs.length > 0 ? (
          <ul className="space-y-2">
            {filteredJobs.map((job: any, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                <strong>City:</strong> {job.city} <br />
                <strong>Facility:</strong> {job.facilityType} <br />
                <strong>Shifts:</strong> {job.shiftsNeeded.join(", ")} <br />
                <strong>Job Type:</strong> {job.jobType} <br />
                <strong>Job Title:</strong> {job.facilityName} <br />
                <strong>Roles:</strong> {job.medicalRole} <br />
                <strong>StaffNeeded:</strong> {job.staffNeeded.join(", ")}{" "}
                <br />
                <button
                  onClick={() => viewDetails(job)}
                  className="mt-2 bg-white border cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs match your criteria.</p>
        )}
      </div>

      {view && <ViewJobs job={view} onClose={() => setView(null)} />}
    </div>
  );
}
