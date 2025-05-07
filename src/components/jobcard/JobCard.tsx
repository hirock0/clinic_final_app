"use client";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import swal from "sweetalert";
import ViewJobs from "../viewjobs/ViewJobs";
import HealthcareApplicationForm from "../applyform/HealthcareApplicationForm";

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

const JobCard = ({ jobs }: { jobs: HealthcareJob[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.slices);
  const [selectedJob, setSelectedJob] = useState<HealthcareJob | null>(null);
  const [view, setView] = useState<viewDetails | null>(null);

  const viewDetails = (job: any) => {
    setView(job);
  };

  const applyHandler = (job: any) => {
    if (!user) {
      router.push(`/user/login?redirectTo=${encodeURIComponent(pathname)}`);
    } else if (user?.role !== "user") {
      if (user?.role === "institutional") {
        swal({
          title: "You are institution",
          text: "Login for user",
          icon: "warning",
        });
      } else {
        if (user?.role === "admin") {
          swal({
            title: "You are admin",
            text: "Login for user",
            icon: "warning",
          });
        } else {
          swal({
            title: "You are employee",
            text: "Login for user",
            icon: "warning",
          });
        }
      }
    } else {
      setSelectedJob(job);
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {jobs?.map((job: any, index: any) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col min-h-[250px]"
        >
          <div className="h-full flex justify-between flex-col">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {job?.facilityName}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{job?.address}</p>
            </div>
            <div className="">
              <p className="text-gray-600 ">
      
                <span>$ {job?.minSalary}</span>
                <span className="mx-1">-</span>
                <span>$ {job?.maxSalary}</span>
              </p>
              <p className="text-gray-600 ">{job?.newAdminPost}</p>
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
                className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
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
  );
};

export default JobCard;
