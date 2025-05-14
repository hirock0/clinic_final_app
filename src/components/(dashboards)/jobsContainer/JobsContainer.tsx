"use client";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import Link from "next/link";
import ApprovedBtn from "@/components/ui/btns/approvedBtn/ApprovedBtn";
import DeleteJobBtn from "@/components/ui/btns/deleteJobBtn/DeleteJobBtn";
import BackBtn from "@/components/ui/btns/backBtn/BackBtn";
import { MdOutlineAddTask } from "react-icons/md";

const JobsContainer = ({
  jobsData,
  title,
}: {
  jobsData: any;
  title: string;
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.slices);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState(jobsData);
  const filteredJobs = jobs?.filter((job: any) =>
    job?.facilityName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteHandler = (id: any) => {
    setJobs((prevJobs: any) => prevJobs.filter((job: any) => job._id !== id));
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="main-bg-color py-6">
      <div className="max-w-[1440px] w-11/12 mx-auto">
        {/* Top Bar */}
        <div className="mb-6 sticky top-0 z-50 main-bg-color p-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
            <BackBtn />
            <h1 className="text-2xl font-semibold text-center md:text-left main-text-color">
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
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-text">
                      {job?.facilityName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {job?.facilityType}
                    </p>
                    <p className="text-sm text-gray-500">
                      {job?.city}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Applied on: {job?.postdDate}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-6">
                    {user?.role === "admin" && (
                      <DeleteJobBtn deleteHandler={deleteHandler} job={job} />
                    )}
                    {user?.role === "admin" && (
                      <Link
                        href={`/admin/posted/add_info/${job?._id}`}
                        className="flex justify-center second-bg-color text-white rounded-sm shadow-md hover:scale-105 active:scale-100 w-32 h-10 items-center gap-2 text-sm transition"
                      >
                        <MdOutlineAddTask size={20} />
                        <span>Add Info</span>
                      </Link>
                    )}
                    {/* View Details Button */}
                    {user?.role !== "admin" && (
                      <Link
                        href={`/job/view/${job?._id}`}
                        className="flex justify-center accent-bg-color rounded-sm shadow-md hover:scale-105 active:scale-100 font-semibold w-32 h-10 items-center gap-2 text-sm transition"
                      >
                        <span>View Details</span>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  {user?.role === "admin" && <ApprovedBtn job={job} />}
                </div>
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
