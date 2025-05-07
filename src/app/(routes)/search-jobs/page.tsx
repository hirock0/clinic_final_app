export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import JobCard from "@/components/jobcard/JobCard";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";
const JobsPage = async () => {
  const reqAllJobs = await AllJobs();
  const allJobs = await reqAllJobs.allJobs;
  const approvedJobs = await allJobs?.filter(
    (item: any) => item?.approvedStatus === true
  );
  return (
    <section className="">
      {/* filter sidebar */}
      <div className="second-bg-color py-4 md:py-8 ">
        <FilterSidebar />
      </div>

      {/* Job Cards */}
      <div className="max-w-[1440px] w-11/12 mx-auto gap-6 py-12 md:py-20 ">
        <JobCard jobs={approvedJobs} />
      </div>
    </section>
  );
};

export default JobsPage;
