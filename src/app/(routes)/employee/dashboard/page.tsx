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
  const design1 =
    " bg-gradient-to-br from-yellow-300 via-yellow-400 to-red-400";
  const design2 =
    " bg-gradient-to-br from-green-400 via-green-300 to-yellow-300";

  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/employee/posted/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={design1}
            applications={allJobs}
            title="Posted"
            title2="Jobs"
          />
        </Link>

        <Link
          href={`/employee/approved/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={design2}
            applications={approvedJobs}
            title="Approved"
            title2="Jobs"
          />
        </Link>
      </div>
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/employee/posted/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={design2}
            applications={allApplications}
            title="User Posted"
            title2="Applications"
          />
        </Link>

        <Link
          href={`/employee/approved/applications`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={design1}
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
