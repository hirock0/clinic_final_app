export const dynamic = "force-dynamic";
import JobsContainer from "@/components/(dashboards)/jobsContainer/JobsContainer";
import { FindInstitutionalJobs } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
const JobsPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindInstitutionalJobs(user?.email);
  const reqJobsData = await reqApplications?.appliedJobs;
  const approvedJobs = await reqJobsData?.filter(
    (item: any) => item?.approvedStatus === true
  );
  return (
    <div>
      <JobsContainer jobsData={approvedJobs} title={"Posted"} />
    </div>
  );
};

export default JobsPage;
