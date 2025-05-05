"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IoSearchOutline,
  IoTrashOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

const JobsContainer = ({
  jobsData,
  title,
}: {
  jobsData: any;
  title: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState(jobsData);

  const filteredJobs = jobs.filter((job: any) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setJobs((prevJobs: any) => prevJobs.filter((job: any) => job.id !== id));
  };

  return (
    <div className="bg-zinc-100 min-h-screen py-6">
      <div className="max-w-5xl w-11/12 mx-auto">
        {/* Top Bar */}
        <div className="mb-6 sticky top-0 z-50 bg-zinc-100 py-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <IoArrowBackOutline size={22} className="mr-1" />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-2xl font-semibold text-center md:text-left">
              {title}
            </h1>
            <div className="w-full md:w-1/2">
              <div className="relative flex items-center rounded-md shadow-sm bg-white border border-slate-300">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 text-sm rounded-md border-0 outline-none bg-transparent"
                />
                <IoSearchOutline
                  className="absolute right-3 text-gray-500"
                  size={18}
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Applications: <span className="font-medium">{jobs.length}</span>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="grid gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job: any, index: any) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied on: {job.dateApplied}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="mt-4 sm:mt-0 sm:ml-6 flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
                >
                  <IoTrashOutline size={18} />
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10 text-sm">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsContainer;
