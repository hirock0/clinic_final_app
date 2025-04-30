"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobcard/JobCard";
import axios from "axios";

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
    <section>
      {/* Job Cards */}
      <JobCard jobs={jobs}/>
    </section>
  );
};

export default JobsPage;
