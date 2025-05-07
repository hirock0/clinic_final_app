export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import JobsContainer from "@/components/(dashboards)/jobsContainer/JobsContainer";
const JobsPage = async () => {
  const reqJobsData = await AllJobs();
  const initialJobs = await reqJobsData?.allJobs;
  const approvedJobs = await initialJobs?.filter(
    (item: any) => item?.approvedStatus === true
  );
  return (
    <div>
      {/* <JobsContainer jobsData={approvedJobs} title={"Posted"} /> */}
      <h1>Not applied yet</h1>
    </div>
  );
};

export default JobsPage;
