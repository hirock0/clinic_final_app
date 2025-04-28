"use client";

import React from "react";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";
import JobCard from "@/components/jobcard/JobCard";

const JobsPage = () => {
  return (
    <section className=" ">
      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto w-11/12 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar />
          <div>
            {/* Job Cards */}
            <JobCard />
          </div>
        </div>
      </main>
    </section>
  );
};

export default JobsPage;
