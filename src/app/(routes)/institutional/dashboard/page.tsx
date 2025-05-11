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

  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/institutional/posted/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
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
