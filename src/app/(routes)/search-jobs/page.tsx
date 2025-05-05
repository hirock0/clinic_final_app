"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobcard/JobCard";
import axios from "axios";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";
import Loading from "@/components/loading/Loading";

interface HealthcareJob {
  id: number;
  title: string;
  description: string;
  facilityName: string;
  facilityType: string;
  address: string;
  state: string;
  zipCode: string;
  staffNeeded: string[];
  shiftsNeeded: string[];
  numberOfPositions: string;
  startDate: string;
  otherStaff?: string;
  position: string;
  _id: string;
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<HealthcareJob[]>([]);
  const [loading, setLoading] = useState(true);

  // get all jobs
  useEffect(() => {
    const getAllJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/pages/api/jobs");
        setJobs(res?.data?.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        throw new Error(error.message);
      }
    };
    getAllJobs();
  }, []);

  return (
    <section className="">
      {/* filter sidebar */}
      <div className="second-bg-color py-4 md:py-8 ">
        <FilterSidebar />
      </div>

      {/* Job Cards */}
      <div className="max-w-[1440px] w-11/12 mx-auto gap-6 py-12 md:py-20 ">
        {loading ? (
          <div className=" h-[60vh] flex items-center justify-center">
            <Loading style="flex items-center justify-center" />
          </div>
        ) : (
          <JobCard jobs={jobs} />
        )}
      </div>
    </section>
  );
};

export default JobsPage;
