'use client';
import { FiMapPin, FiClock, FiBookmark, FiDollarSign, FiUserCheck } from 'react-icons/fi';
import { FaRegStar, FaStar } from 'react-icons/fa';
import React, { useState } from 'react';

const JobCard = () => {
    // const [savedJobs, setSavedJobs] = useState<number[]>([]);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [filters, setFilters] = useState({
    //     location: '',
    //     jobType: '',
    //     experienceLevel: '',
    //     remoteOnly: false,
    //     salaryRange: ''
    // });


    // const toggleSavedJob = (id: number) => {
    //     if (savedJobs.includes(id)) {
    //         setSavedJobs(savedJobs.filter(jobId => jobId !== id));
    //     } else {
    //         setSavedJobs([...savedJobs, id]);
    //     }
    // };

    // Sample job data
    const jobs = [
        {
            id: 1,
            title: 'Personal Care Aide (PCA) / Home Health Aide (HHA)',
            posted: '2 hours ago',
            salary: '$12–$20/hr',
            location: 'Various (in-home, assisted living)',
            type: 'Part-time / Full-time',
            duration: 'Ongoing',
            description: 'Assist elderly or disabled clients with daily activities such as bathing, dressing, meals, and companionship. Great for those starting in caregiving!',
            skills: ['Personal Care', 'Companionship', 'Meal Preparation', 'Light Housekeeping'],
            license: 'None (HHA/PCA certificate preferred)',
            level: 'Entry-Level',
            verified: true,
            saved: false
        },
        {
            id: 2,
            title: 'Private Caregiver (Independent)',
            posted: '4 hours ago',
            salary: '$15–$25/hr',
            location: 'Flexible (you choose clients)',
            type: 'Independent Contractor',
            duration: 'Flexible',
            description: 'Work directly with families to provide non-medical support. Set your own schedule and rates. Experience preferred.',
            skills: ['Personal Care', 'Schedule Management', 'Client Relations'],
            license: 'None',
            level: 'Entry-Level',
            verified: false,
            saved: false
        },
        {
            id: 3,
            title: 'Certified Nursing Assistant (CNA)',
            posted: '1 day ago',
            salary: '$15–$25/hr',
            location: 'Hospitals, nursing homes, home care',
            type: 'Full-time / Part-time',
            duration: 'Ongoing',
            description: 'Provide hands-on patient care, assist with mobility, hygiene, and monitor vital signs. A fast-track healthcare career path!',
            skills: ['Patient Care', 'Vital Signs', 'Mobility Assistance', 'Medical Documentation'],
            license: 'CNA certification required',
            level: 'Mid-Level',
            verified: true,
            saved: false
        },
        {
            id: 4,
            title: 'Specialized Caregiver (Dementia, Hospice)',
            posted: '1 day ago',
            salary: '$18–$30/hr',
            location: 'In-home or assisted living',
            type: 'Full-time / Part-time',
            duration: 'Ongoing',
            description: 'Support clients with complex conditions such as Alzheimer’s, stroke recovery, or hospice. Certification in dementia care highly valued.',
            skills: ['Dementia Care', 'Hospice Care', 'Behavior Management', 'Specialized Training'],
            license: 'Certification in specialized care preferred',
            level: 'Mid-Level',
            verified: true,
            saved: false
        },
        {
            id: 5,
            title: 'Licensed Practical Nurse (LPN) / Registered Nurse (RN)',
            posted: '3 days ago',
            salary: '$30–$70/hr',
            location: 'Hospitals, in-home, case management',
            type: 'Full-time / Contract',
            duration: 'Ongoing',
            description: 'Deliver professional medical care including medication administration, care planning, and assessments. High-paying and flexible roles available.',
            skills: ['Medication Administration', 'Wound Care', 'Care Planning', 'Patient Assessment'],
            license: 'LPN or RN license required',
            level: 'High-Level',
            verified: true,
            saved: false
        },
        {
            id: 6,
            title: 'Private Duty Nurse (LPN/RN)',
            posted: '5 days ago',
            salary: '$35–$75/hr',
            location: 'In-home (1-on-1 care)',
            type: 'Full-time / Contract',
            duration: 'Long-term',
            description: 'Work directly with high-needs clients (ventilator, trach, etc.). Paid by families or Medicaid programs. Experience with critical care preferred.',
            skills: ['Critical Care', 'Ventilator Care', 'Tracheostomy Care', 'Complex Care'],
            license: 'Active LPN or RN license required',
            level: 'High-Level',
            verified: true,
            saved: false
        },
        {
            id: 7,
            title: 'Caregiving Business Owner',
            posted: '1 week ago',
            salary: '$25–$45/hr',
            location: 'Anywhere (own your service area)',
            type: 'Business Owner / Freelance',
            duration: 'Ongoing',
            description: 'Start your own caregiving agency. Hire caregivers, manage client relationships, and build a profitable brand. High growth potential.',
            skills: ['Business Management', 'Caregiver Recruitment', 'Client Relations', 'Marketing'],
            license: 'Business license; bonding & insurance recommended',
            level: 'Entrepreneurial',
            verified: false,
            saved: false
        },
        {
            id: 8,
            title: 'Virtual Care Coordinator / Case Manager (RN Only)',
            posted: '2 days ago',
            salary: '$25–$50/hr',
            location: 'Remote',
            type: 'Remote / Part-time / Contract',
            duration: 'Ongoing',
            description: 'Coordinate care remotely, follow up with patients and families, and manage healthcare schedules. Work from home in a fast-growing field.',
            skills: ['Care Coordination', 'Case Management', 'Telehealth', 'Patient Advocacy'],
            license: 'RN license required',
            level: 'Remote',
            verified: true,
            saved: false
        },
        {
            id: 9,
            title: 'Telehealth Support Specialist',
            posted: '1 day ago',
            salary: '$20–$40/hr',
            location: 'Remote',
            type: 'Remote / Part-time / Contract',
            duration: 'Ongoing',
            description: 'Work for health tech companies helping seniors remotely. Onboard clients, do wellness check-ins, and assist with tech support. Flexible hours.',
            skills: ['Telehealth', 'Tech Support', 'Client Onboarding', 'Wellness Checks'],
            license: 'Healthcare experience or certification preferred',
            level: 'Remote',
            verified: false,
            saved: false
        }
    ];


    // const filteredJobs = jobs.filter(job => {
    //     return (
    //         job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    //     ) && (
    //             filters.location === '' || job.location.includes(filters.location)
    //         ) && (
    //             filters.jobType === '' || job.type === filters.jobType
    //         ) && (
    //             !filters.remoteOnly || job.type === 'Remote'
    //         );
    // });

    return (
        <div className='w-full'>
            <div className="mb-4 flex justify-between items-center">
                {/* <h2 className="text-lg font-semibold">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                </h2> */}
                <h2 className="text-lg font-semibold">
                    9 Jobs Found
                </h2>
                <div className="text-sm text-gray-500">
                    Sorted by: <span className="font-medium">Most Recent</span>
                </div>
            </div>
            <div className="space-y-6">
                {jobs.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        {/* Job Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${job.level === 'Entry-Level' ? 'bg-blue-100 text-blue-800' :
                                    job.level === 'Mid-Level' ? 'bg-green-100 text-green-800' :
                                        job.level === 'High-Level' ? 'bg-purple-100 text-purple-800' :
                                            job.level === 'Entrepreneurial' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                    }`}>
                                    {job.level}
                                </span>
                                <h3 className="text-xl font-semibold text-gray-800 mt-2">{job.title}</h3>
                            </div>
                            <button className="text-gray-400 hover:text-blue-500">
                                <FiBookmark className={job.saved ? 'fill-blue-500 text-blue-500' : ''} />
                            </button>
                        </div>

                        {/* Job Meta */}
                        <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
                            <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                                <FiMapPin className="mr-1" /> {job.location}
                            </span>
                            <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                                <FiClock className="mr-1" /> {job.type}
                            </span>
                            <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                                <FiDollarSign className="mr-1" /> {job.salary}
                            </span>
                            {job.verified && (
                                <span className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                                    <FiUserCheck className="mr-1" /> Verified Employer
                                </span>
                            )}
                        </div>

                        {/* License Requirement */}
                        <div className="mb-3">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">License Required:</span> {job.license}
                            </p>
                        </div>

                        {/* Job Description */}
                        <p className="text-gray-600 mb-4">{job.description}</p>

                        {/* Skills */}
                        <div className="mb-5">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills/Qualifications:</h4>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Posted {job.posted}
                            </p>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    View Details
                                </button>
                                <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobCard;