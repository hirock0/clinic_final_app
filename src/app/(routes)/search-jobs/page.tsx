"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobcard/JobCard";
import axios from "axios";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";

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
  position: string; // Added the missing property
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<HealthcareJob[]>([]);

  // get all jobs
  useEffect(() => {
      const getAllJobs = async () => {
          const res = await axios.get('/pages/api/jobs');
          setJobs(res?.data?.data);
      }
      getAllJobs();
  },[])


  return (
    <section className="">
      {/* filter sidebar */}
      <div className="second-bg-color py-4 md:py-8 ">
      <FilterSidebar />
      </div>

      {/* Job Cards */}
      <div className="max-w-[1440px] w-11/12 mx-auto gap-6 py-12 md:py-20">
      <JobCard jobs={jobs}/>
      </div>
    </section>
  );
};

export default JobsPage;
