import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FaHandshakeSimple, FaLocationDot, FaSackDollar } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
interface ViewJobsProps {
  job: {
    jobFacilityType: string;
    address: string;
    assignmentDuration: string;
    additionalNotes: string;
    newAdminPost: string;
    minSalary: number;
    maxSalary: number;
    negotiationNote: string;
    salaryNegotiable: boolean;
    jobFacilityRole: string;

  };
  onClose: () => void;
}

const ViewJobs: React.FC<ViewJobsProps> = ({ job, onClose }) => {

  console.log(job)

  const {
    jobFacilityType,
    address,
    additionalNotes,
    minSalary,
    maxSalary,
    newAdminPost,
    negotiationNote,
    salaryNegotiable,
    jobFacilityRole
  } = job;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {jobFacilityType}
              </h2>

              <p className="text-gray-600 font-medium ">{jobFacilityRole}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute right-5 top-5 bg-base-300 text-gray-700 hover:text-red-500 rounded-md shadow-sm transition-colors duration-300 p-1 cursor-pointer"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Facility Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-600 border-gray-200 border-b pb-2">
                Facility Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <FaLocationDot size={20} className="main-text-color" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{address}</p>
                </div>
                {/* ammount */}
                {salaryNegotiable ? (
                  <div className="flex items-center text-gray-600 text-sm space-x-3">
                    <FaHandshakeSimple size={20} className="main-text-color" />
                    <span>
                      {negotiationNote}
                    </span>
                  </div>
                ) :
                  <div className="flex items-center text-gray-600 text-sm space-x-3">
                    <FaSackDollar size={20} className="main-text-color" />
                    <span>
                      ${minSalary} - ${maxSalary}
                    </span>
                  </div>
                }
                {/* time */}
                <div className="flex items-center space-x-3">
                  <FaCalendarCheck size={20} className=" main-text-color" />
                  <p className="text-gray-500">{newAdminPost}</p>
                </div>
              </div>
              <div>
                <p className="text-base text-gray-500">{additionalNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobs;
