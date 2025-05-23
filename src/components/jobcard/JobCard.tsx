"use client";
import React, { useEffect, useState } from "react";
import { FaSackDollar, FaLocationDot, FaHandshakeSimple } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import swal from "sweetalert";
import { FaExclamationCircle } from "react-icons/fa";
import ViewJobs from "../viewjobs/ViewJobs";
import HealthcareApplicationForm from "../applyform/HealthcareApplicationForm";
import axios from "axios";

interface HealthcareJob {
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
  jobFacilityType: string;
  negotiationNote: string;
  salaryNegotiable: boolean;
  salaryType: string;
}

interface viewDetails {
  jobFacilityType: string;
  jobFacilityRole: string;
  address: string;
  assignmentDuration: string;
  additionalNotes: string;
  newAdminPost: string;
  minSalary: number;
  maxSalary: number;
  negotiationNote: string;
  salaryNegotiable: boolean;
  salaryType: string;
  jobSummary: string;
  uclOverview: string;
  keyResponsibilities: { value: string }[];
  qualifications: { value: string }[];
  benefits: { value: string }[];
}

const JobCard = ({ data }: any) => {
  const { selectedCity, selectedFacilityType, selectedJobType, selectedRole } = data;


  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.slices);
  const [selectedJob, setSelectedJob] = useState<HealthcareJob | null>(null);
  const [view, setView] = useState<viewDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<HealthcareJob[]>([]);
  const [afterFilter, setAfterFilter] = useState<HealthcareJob[]>([]);
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
        setAfterFilter(response?.data?.pageJobs || []);
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


  console.log(selectedCity, selectedFacilityType, selectedJobType, selectedRole)

  const searcHandler = async () => {
    try {
      const response = await axios.get(`/pages/api/allJobs`);
      const allData = await response?.data?.allJobs;
      const approvedData = await allData?.filter(
        (item: any) => item?.approvedStatus === true
      );
      const filterData = approvedData?.filter((item: any) => {
        const matchCity =
          selectedCity &&
          item?.address?.toLowerCase().includes(selectedCity.toLowerCase());

        const matchFacilityType =
          selectedFacilityType &&
          item?.jobFacilityType
            ?.toLowerCase()
            .includes(selectedFacilityType.toLowerCase());

        const matchJobType =
          selectedJobType &&
          item?.salaryType
            ?.toLowerCase()
            .includes(selectedJobType.toLowerCase());

        const matchRole =
          selectedRole &&
          item?.jobFacilityRole
            ?.toLowerCase()
            .includes(selectedRole.toLowerCase());

        return matchCity || matchFacilityType || matchJobType || matchRole;
      });
      if (
        selectedCity !== "" ||
        selectedFacilityType !== "" ||
        selectedJobType !== "" ||
        selectedRole !== ""
      ) {
        setPageData(filterData);
      } else {
        setPageData(afterFilter);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    searcHandler();
  }, [selectedCity, selectedFacilityType, selectedJobType, selectedRole]);


  console.log(pageData)

  return (
    <div className="space-y-6">
      {/* Job Cards */}
      {loading ? (
        <div className=" h-[70vh] w-full flex items-center justify-center">
          <div className=" loading loading-spinner"></div>
        </div>
      ) : pageData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <FaExclamationCircle className="text-5xl text-red-400 mb-4" />
          <h2 className="text-xl font-semibold">No Data Found</h2>
          <p className="text-sm mt-1">We couldn't find any matching results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pageData?.map((job: any, index: any) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300"
            >

              <div className="flex flex-col justify-between h-full">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold mb-2">
                    {job?.jobFacilityType}
                  </h3>
                </div>

                {/* Salary and Post Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 text-sm space-x-2">
                    <FaLocationDot size={18} className="main-text-color" />
                    <span>{job?.address}</span>
                  </div>


                  {job?.salaryNegotiable ? (
                    <div className="flex items-center text-gray-600 text-sm space-x-2">
                      <FaHandshakeSimple size={18} className="main-text-color" />
                      <span>
                        {job?.negotiationNote}
                      </span>
                    </div>
                  ) :
                    <div className="flex items-center text-gray-600 text-sm space-x-2">
                      <FaSackDollar size={18} className="main-text-color" />
                      <span>
                        ${job?.minSalary} - ${job?.maxSalary} /<span className="text-xs">{job?.salaryType}</span>
                      </span>
                    </div>
                  }

                  <div className="flex items-center text-gray-600 text-sm space-x-2">
                    <FaCalendarCheck size={18} className="main-text-color" />
                    <span>{job?.newAdminPost}</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-5 pt-4 border-t border-gray-200 flex gap-3">
                  <button
                    onClick={() => viewDetails(job)}
                    className="w-full btn1 transition-colors px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => applyHandler(job)}
                    className="w-full btn2 transition-colors px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer"
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
      )
      }

      {/* Pagination */}
      {
        totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
            {currentPage > 1 && (
              <button
                onClick={() => pageJobsHandler(currentPage - 1)}
                className="px-3 py-1 rounded-md border bg-white second-text-color accent-border-color hover:bg-[#fff6d7]"
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
                      className={`px-4 py-2 rounded-md border ${currentPage === page
                        ? "accent-bg-color second-text-color accent-border-color"
                        : "bg-white second-text-color accent-border-color hover:bg-[#fff6d7]"
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
                className="px-3 py-1 rounded-md border bg-white second-text-color accent-border-color hover:bg-[#fff6d7]"
              >
                Next
              </button>
            )}
          </div>
        )
      }
    </div >
  );
};

export default JobCard;
