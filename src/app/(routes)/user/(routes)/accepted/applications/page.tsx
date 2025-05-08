export const dynamic = "force-dynamic";
import { FindUserApplications } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
import ApplicationContainer from "@/components/(dashboards)/applicationContainer/ApplicationContainer";
const JobsPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindUserApplications(user?.email);
  const applications = await reqApplications?.appliedApplications;
  const approvedApplications = await applications?.filter(
    (item: any) => item?.status === "approved"
  );
  return (
    <div>
      <ApplicationContainer
        applicationData={approvedApplications}
        title={"Applied"}
      />
    </div>
  );
};

export default JobsPage;
