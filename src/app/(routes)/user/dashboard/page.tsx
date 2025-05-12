export const dynamic = "force-dynamic";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Link from "next/link";
import { FindUserApplications } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
const DashboardPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindUserApplications(user?.email);
  const applications = await reqApplications?.appliedApplications;
  const approvedApplications = await applications?.filter(
    (item: any) => item?.status === "approved"
  );
  const unApprovedApplications = await applications?.filter(
    (item: any) => item?.status !== "approved"
  );
  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/user/applied/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            applications={unApprovedApplications}
            title="Applied"
            title2="Applications"
          />
        </Link>
        <Link
          href={`/user/accepted/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            applications={approvedApplications}
            title="Accepted"
            title2="Applications"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
