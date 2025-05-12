export const dynamic = "force-dynamic";
import { AllJobs, FindAllApplications } from "@/app/actions/apis/Apis";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Link from "next/link";
const DashboardPage = async () => {
  const reqAllJobs = await AllJobs();
  const allJobs = reqAllJobs?.allJobs;
  const reqApplications = await FindAllApplications();
  const allApplications = reqApplications?.applications;

  const approvedJobs = await allJobs?.filter(
    (item: any) => item?.approvedStatus === true
  );
  const unApprovedJobs = await allJobs?.filter(
    (item: any) => item?.approvedStatus === false
  );

  const approvedApplications = await allApplications?.filter(
    (item: any) => item?.status === "approved"
  );
  const unApprovedApplications = await allApplications?.filter(
    (item: any) => item?.status !== "approved"
  );

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Jobs Section */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <Link href="/admin/posted/jobs" className="w-full" data-tip="Click">
          <ApplicationCard
            applications={unApprovedJobs}
            title="Posted"
            title2="Jobs"
          />
        </Link>

        <Link href="/admin/approved/jobs" className="w-full" data-tip="Click">
          <ApplicationCard
            applications={approvedJobs}
            title="Approved"
            title2="Jobs"
          />
        </Link>
      </div>

      {/* Applications Section */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <Link
          href="/admin/posted/applications"
          className="w-full"
          data-tip="Click"
        >
          <ApplicationCard
            applications={unApprovedApplications}
            title="User Posted"
            title2="Applications"
          />
        </Link>

        <Link
          href="/admin/approved/applications"
          className="w-full"
          data-tip="Click"
        >
          <ApplicationCard
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
