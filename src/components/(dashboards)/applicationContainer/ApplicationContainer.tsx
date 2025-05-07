"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoSearchOutline, IoArrowBackOutline } from "react-icons/io5";
import { fetchData } from "@/utils/redux/slices/slice";
import ViewJobs from "@/components/viewjobs/ViewJobs";
const ApplicationContainer = ({
  jobsData,
  title,
}: {
  jobsData: any;
  title: string;
}) => {
  const [view, setView] = useState<any | null>(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState(jobsData);
  const filteredJobs = jobs?.filter((job: any) =>
    job?.facilityName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const viewDetails = (job: any) => {
    setView(job);
  };
  return (
    <div className="bg-zinc-100 py-6">
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
            filteredJobs?.map((job: any, index: number) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition "
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {job?.facilityName}
                    </h2>
                    <p className="text-sm text-gray-600">{job?.facilityType}</p>
                    <p className="text-sm text-gray-500">{job?.city}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      {job?.userIdandEmails?.map((item: any, index: any) => (
                        <div className="" key={index}>
                          Applied on: {item?.userAppliedDate}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={() => viewDetails(job)}
                      className="flex-1 bg-white border cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                {view && <ViewJobs job={view} onClose={() => setView(null)} />}
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

export default ApplicationContainer;
