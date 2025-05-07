export const dynamic = "force-dynamic";
import { FindUserApplications } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
import ApplicationContainer from "@/components/(dashboards)/applicationContainer/ApplicationContainer";
const JobsPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindUserApplications(user?.email);
  const applications = reqApplications?.appliedJobs;
  return (
    <div>
      <ApplicationContainer jobsData={applications} title={"Applied"} />
    </div>
  );
};

export default JobsPage;
