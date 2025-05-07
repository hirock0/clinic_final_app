export const dynamic = "force-dynamic";
import JobsContainer from "@/components/(dashboards)/jobsContainer/JobsContainer";
import { FindUserApplications } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
const JobsPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindUserApplications(user?.email);
  const applications = reqApplications?.appliedJobs;
  return (
    <div>
      <JobsContainer jobsData={applications} title={"Posted"} />
    </div>
  );
};

export default JobsPage;
