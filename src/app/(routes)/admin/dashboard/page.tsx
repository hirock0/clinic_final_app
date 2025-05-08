export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Link from "next/link";
import { FindAllApplications } from "@/app/actions/apis/Apis";
const DashboardPage = async () => {
  const reqAllJobs = await AllJobs();
  const allJobs = await reqAllJobs?.allJobs;
  const reqApplications = await FindAllApplications();
  const allApplications = await reqApplications?.applications;
  const approvedJobs = await allJobs?.filter(
    (item: any) => item?.approvedStatus === true
  );
  const approvedApplications = await allApplications?.filter(
    (item: any) => item?.status === "approved"
  );

  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/admin/posted/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-red-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={allJobs}
            title="Posted"
            title2="Jobs"
          />
        </Link>

        <Link
          href={`/admin/approved/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-green-300 via-yellow-300 text-2xl to-yellow-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={approvedJobs}
            title="Approved"
            title2="Jobs"
          />
        </Link>
      </div>
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/admin/posted/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-red-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={allApplications}
            title="User Posted"
            title2="Applications"
          />
        </Link>

        <Link
          href={`/admin/approved/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-green-300 via-yellow-300 text-2xl to-yellow-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={approvedApplications}
            title="Approved"
            title2="Applications"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
