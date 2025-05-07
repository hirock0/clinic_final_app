export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Link from "next/link";
import { FindUserApplications } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
const DashboardPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindUserApplications(user?.email);
  const applications = reqApplications?.appliedJobs;

  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/user/applied/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-red-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={applications}
            title="Applied"
          />
        </Link>
        <Link
          href={`/user/accepted/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-green-300 via-yellow-300 text-2xl to-yellow-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={applications}
            title="Approved"
          />
        </Link>
        <Link
          href={`/user/rejected/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-red-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={applications}
            title="Rejected"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
