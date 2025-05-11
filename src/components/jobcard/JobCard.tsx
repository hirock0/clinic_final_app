"use client";
import React, { useEffect, useState } from "react";
import { FaSackDollar, FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import swal from "sweetalert";
import ViewJobs from "../viewjobs/ViewJobs";
import HealthcareApplicationForm from "../applyform/HealthcareApplicationForm";
import axios from "axios";

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
  position: string;
  otherStaff?: string;
  _id: string;
  minSalary?: number;
  maxSalary?: number;
  newAdminPost?: string;
}

interface viewDetails {
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
  otherStaff: string;
  numberOfPositions: string;
  shiftsNeeded: string[];
  startDate: string;
  assignmentDuration: string;
  additionalNotes: string;
}

const JobCard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state?.slices);

  const [selectedJob, setSelectedJob] = useState<HealthcareJob | null>(null);
  const [view, setView] = useState<viewDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<HealthcareJob[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12;
  const viewDetails = (job: any) => {
    setView(job);
  };
  const applyHandler = (job: any) => {
    if (!user) {
      router.push(`/user/login?redirectTo=${encodeURIComponent(pathname)}`);
    } else if (user?.role !== "user") {
      swal({
        title: `You are ${user.role}`,
        text: "Login as a user",
        icon: "warning",
      });
    } else {
      setSelectedJob(job);
    }
  };
  const pageJobsHandler = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/pages/api/search_pagination_jobs?page=${page}&perPage=${perPage}`
      );
      if (response?.data?.success) {
        setPageData(response?.data?.pageJobs || []);
        setTotalPages(response?.data?.totalPages || 1);
        setCurrentPage(page);
        setLoading(false);
      } else {
        swal({
          title: `Somethig goes wrong`,
          icon: "warning",
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    pageJobsHandler(currentPage);
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Job Cards */}
      {loading ? (
        <div className=" h-[70vh] w-full flex items-center justify-center">
          <div className=" loading loading-spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pageData?.map((job: any, index: any) => (
            <div
              key={index}
              className="bg-white hover:scale-105 p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col min-h-[250px]"
            >
              <div className="h-full flex justify-between flex-col">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job?.facilityName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <FaLocationDot size={18} className=" text-red-700" />
                    <p className="text-gray-600 text-sm mt-2">{job?.address}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <FaSackDollar size={18} className=" text-cyan-700" />
                    <p className="text-gray-600">
                      <span>$ {job?.minSalary}</span>
                      <span className="mx-1">-</span>
                      <span>$ {job?.maxSalary}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarCheck size={18} className=" text-cyan-700" />
                    <p className="text-gray-600 ">{job?.newAdminPost}</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-gray-100">
                <div className="flex gap-3">
                  <button
                    onClick={() => viewDetails(job)}
                    className="flex-1 bg-white border cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => applyHandler(job)}
                    className="flex-1 cursor-pointer accent-bg-color hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {selectedJob && (
            <HealthcareApplicationForm
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}
          {view && <ViewJobs job={view} onClose={() => setView(null)} />}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          {currentPage > 1 && (
            <button
              onClick={() => pageJobsHandler(currentPage - 1)}
              className="px-3 py-1 rounded-md border bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
            >
              Prev
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, i, arr) => {
              const prevPage = arr[i - 1];
              const showEllipsis = prevPage && page - prevPage > 1;
              return (
                <React.Fragment key={page}>
                  {showEllipsis && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  <button
                    onClick={() => pageJobsHandler(page)}
                    className={`px-4 py-2 rounded-md border ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}

          {currentPage < totalPages && (
            <button
              onClick={() => pageJobsHandler(currentPage + 1)}
              className="px-3 py-1 rounded-md border bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCard;