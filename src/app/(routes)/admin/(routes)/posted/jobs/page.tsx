export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import JobsContainer from "@/components/(dashboards)/jobsContainer/JobsContainer";

const JobsPage = async () => {
  const reqJobsData = await AllJobs();
  const initialJobs = await reqJobsData?.allJobs;
  const unApprovedJobs = await initialJobs.filter(
    (job: any) => job?.approvedStatus === false
  );
  return (
    <div>
      <JobsContainer jobsData={unApprovedJobs} title={"Posted"} />
    </div>
  );
};

export default JobsPage;
