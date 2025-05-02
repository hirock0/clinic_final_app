"use client";
import React, { useState } from "react";
import { FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import ApplyForm from "../applyform/ApplyForm";

interface HealthcareJob {
  facilityName: string;
  facilityType: string;
  address: string;
  state: string;
  zipCode: string;
  staffNeeded: string[];
  shiftsNeeded: string[];
  numberOfPositions: string;
  startDate: string;
  position: string; // Added position property
  otherStaff?: string;
}

const JobCard = ({ jobs }: { jobs: HealthcareJob[] }) => {
  const [selectedJob, setSelectedJob] = useState<HealthcareJob | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {jobs?.map((job: any, index: any) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col min-h-[350px]"
        >
          {/* Facility Header */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {job.facilityName}
            </h3>
            <p className="text-gray-600">
              {job?.facilityType} • {job?.address}, {job?.state} {job?.zipCode}
            </p>
          </div>

          {/* Staffing Needs */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
              <FiUsers className="mr-1" /> {job?.numberOfPositions} positions
            </span>
            <span className="flex items-center bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
              <FiClock className="mr-1" /> {job?.shiftsNeeded.join(", ")} shifts
            </span>
          </div>

          {/* Positions Needed */}
          <div className="mb-3 flex-grow">
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Staff Needed:
            </h4>
            <div className="flex flex-wrap gap-2">
              {job?.staffNeeded?.map((staff: any, i: any) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {staff}
                </span>
              ))}
              {job?.otherStaff && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {job?.otherStaff}
                </span>
              )}
            </div>
          </div>

          {/* Start Date */}
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <FiCalendar className="mr-2" />
            Starts:{" "}
            {new Date(job?.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {/* Action Buttons - Pushed to bottom */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                View Details
              </button>
              <button
                onClick={() => setSelectedJob(job)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Render ApplyForm when a job is selected */}
      {selectedJob && (
        <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default JobCard;
