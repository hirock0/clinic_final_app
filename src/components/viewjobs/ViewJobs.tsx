import React from 'react';
import { 
    FiX, 
    FiMapPin, 
    FiClock, 
    FiUsers, 
    FiCalendar, 
    FiMail, 
    FiPhone,
    FiBriefcase,
    FiUser
  } from 'react-icons/fi';
interface ViewJobsProps {
    job: {
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
        otherStaff?: string;
        numberOfPositions: string;
        shiftsNeeded: string[];
        startDate: string;
        assignmentDuration: string;
        additionalNotes: string;
    };
    onClose: () => void;
}

const ViewJobs: React.FC<ViewJobsProps> = ({ job, onClose }) => {

    const { facilityName,
        facilityType,
        address,
        city,
        state,
        zipCode,
        contactName,
        contactEmail,
        contactPhone,
        staffNeeded,
        otherStaff,
        numberOfPositions,
        shiftsNeeded,
        startDate,
        assignmentDuration,
        additionalNotes } = job


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{facilityName}</h2>
                        <p className="text-gray-600">{facilityType}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <FiMapPin className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Address</p>
                                    <p className="text-gray-600">{address}, {city}, {state} {zipCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Staffing Needs */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-gray-200 border-b pb-2">
                            Staffing Requirements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <FiUsers className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Positions Needed</p>
                                    <p className="text-gray-600">{numberOfPositions} positions</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {staffNeeded.map((staff, index) => (
                                            <span key={index} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {staff}
                                            </span>
                                        ))}
                                        {otherStaff && (
                                            <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {otherStaff}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FiClock className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Shifts Needed</p>
                                    <div className="flex flex-wrap gap-2">
                                        {shiftsNeeded.map((shift, index) => (
                                            <span key={index} className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                                                {shift}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FiCalendar className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Start Date</p>
                                    <p className="text-gray-600">
                                        {new Date(startDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FiBriefcase className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Assignment Duration</p>
                                    <p className="text-gray-600">{assignmentDuration}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    {additionalNotes && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800 border-gray-200 border-b pb-2">
                                Additional Information
                            </h3>
                            <p className="text-gray-600 whitespace-pre-line">{additionalNotes}</p>
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-gray-200 border-b pb-2">
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <FiUser className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Contact Person</p>
                                    <p className="text-gray-600">{contactName}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FiMail className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Email</p>
                                    <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:underline">
                                        {contactEmail}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FiPhone className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-700">Phone</p>
                                    <a href={`tel:${contactPhone}`} className="text-blue-600 hover:underline">
                                        {contactPhone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewJobs;