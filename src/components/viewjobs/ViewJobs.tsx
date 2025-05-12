import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FaLocationDot, FaSackDollar } from "react-icons/fa6";
import {
  FiX,
  FiMapPin,
  FiClock,
  FiUsers,
  FiCalendar,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiUser,
} from "react-icons/fi";
interface ViewJobsProps {
  job: {
    jobFacilityType: string;
    address: string;
    assignmentDuration: string;
    additionalNotes: string;
    newAdminPost: string;
    minSalary: number;
    maxSalary: number;
  };
  onClose: () => void;
}

const ViewJobs: React.FC<ViewJobsProps> = ({ job, onClose }) => {

  const {
    jobFacilityType,
    address,
    additionalNotes,
    minSalary,
    maxSalary,
    newAdminPost
  } = job;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {jobFacilityType}
              </h2>
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
              <h3 className="text-lg font-semibold text-gray-800 border-gray-200 border-b pb-2">
                Facility Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <FaLocationDot size={20} className="main-text-color" />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{address}</p>
                </div>
                {/* ammount */}
                <div className="flex items-center space-x-3">
                  <FaSackDollar size={20} className=" main-text-color" />
                  <p className="text-gray-500 ">
                    <span>$ {minSalary}</span>
                    <span className="mx-1">-</span>
                    <span>$ {maxSalary}</span>
                  </p>
                </div>
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
