export const dynamic = "force-dynamic";
import { FindInstitutionalJobs } from "@/app/actions/apis/Apis";
import { VerifyToken } from "@/app/actions/apis/Apis";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Link from "next/link";
const DashboardPage = async () => {
  const user = await VerifyToken();
  const reqApplications = await FindInstitutionalJobs(user?.email);
  const allJobs = reqApplications?.appliedJobs;
  const approvedJobs = await allJobs?.filter(
    (item: any) => item?.approvedStatus === true
  );

  const design1 =
    " bg-gradient-to-br from-yellow-300 via-yellow-400 to-red-400";
  const design2 =
    " bg-gradient-to-br from-green-400 via-green-300 to-yellow-300";

  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/institutional/posted/jobs`}
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
          href={`/institutional/approved/jobs`}
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
    </div>
  );
};

export default DashboardPage;
