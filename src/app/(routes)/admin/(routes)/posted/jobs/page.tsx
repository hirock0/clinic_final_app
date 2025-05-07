export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import JobsContainer from "@/components/(dashboards)/jobsContainer/JobsContainer";

const JobsPage = async () => {
  const reqJobsData = await AllJobs();
  const initialJobs = await reqJobsData?.allJobs;
  return (
    <div>
      <JobsContainer jobsData={initialJobs} title={"Posted"} />
    </div>
  );
};

export default JobsPage;
