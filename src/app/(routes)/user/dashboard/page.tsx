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
    const design1 =
    " bg-gradient-to-br from-yellow-300 via-yellow-400 to-red-400";
  const design2 =
    " bg-gradient-to-br from-green-400 via-green-300 to-yellow-300";

  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/user/applied/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={design1}
            applications={applications}
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
            design={design2}
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
