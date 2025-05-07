export const dynamic = "force-dynamic";
import JobsContainer from "@/components/(dashboards)/jobsContainer/JobsContainer";
import { FindInstitutionalJobs } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
const JobsPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindInstitutionalJobs(user?.email);
  const jobs = await reqApplications?.appliedJobs;

  return (
    <div>
      <JobsContainer jobsData={jobs} title={"Posted"} />
    </div>
  );
};

export default JobsPage;
