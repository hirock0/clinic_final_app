export const dynamic = "force-dynamic";
import JobCard from "@/components/jobcard/JobCard";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";
import { AllJobs } from "@/app/actions/apis/Apis";
const JobsPage = async () => {
  const reqAllJobs = await AllJobs();
  const allJobs = await reqAllJobs?.allJobs;
  const approvedJobs = await allJobs.filter(
    (job: any) => job?.approvedStatus === true
  );
  return (
    <section>
      <div className="second-bg-color ">
        <div className=" py-4 md:py-8 max-w-[1440px] w-11/12 mx-auto">
          <FilterSidebar jobs={approvedJobs} />
        </div>
      </div>

      <div className="max-w-[1440px] w-11/12 mx-auto gap-6 py-12 md:py-20">
        <JobCard jobs={approvedJobs} />
      </div>
    </section>
  );
};

export default JobsPage;
