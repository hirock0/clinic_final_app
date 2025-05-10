"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/jobcard/JobCard";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((state: any) => state?.slices);

  const [allJobsData, setAllJobs] = useState<any[]>([]);

  // Fetch jobs on mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (allJobs?.length) {
      const approvedJobs = allJobs.filter(
        (job: any) => job?.approvedStatus === true
      );
      setAllJobs(approvedJobs);
    }
  }, [allJobs]);

  return (
    <section>
      <div className="second-bg-color ">
        <div className=" py-4 md:py-8 max-w-[1440px] w-11/12 mx-auto">
          <FilterSidebar jobs={allJobsData} />
        </div>
      </div>

      <div className="max-w-[1440px] w-11/12 mx-auto gap-6 py-12 md:py-20">
        <JobCard jobs={allJobsData} />{" "}
      </div>
    </section>
  );
};

export default JobsPage;
