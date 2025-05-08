export const dynamic = "force-dynamic";
import { FindAllApplications } from "@/app/actions/apis/Apis";
import ForDashboardAplicationsContainer from "@/components/(dashboards)/forDashboardAplicationsContainer/ForDashboardAplicationsContainer";
const ApplicationsPage = async () => {
  const reqApplications = await FindAllApplications();
  const allApplications = await reqApplications?.applications;
  const approvedApplications = await allApplications?.filter(
    (item: any) => item?.status === "approved"
  );
  return (
    <div>
      <ForDashboardAplicationsContainer
        ApplicationData={approvedApplications}
        title={"Approved"}
      />
    </div>
  );
};

export default ApplicationsPage;
