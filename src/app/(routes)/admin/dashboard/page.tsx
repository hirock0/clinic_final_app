import { AllJobs, FindAllApplications } from "@/app/actions/apis/Apis";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const reqAllJobs = await AllJobs();
  const allJobs = reqAllJobs?.allJobs;
  const reqApplications = await FindAllApplications();
  const allApplications = reqApplications?.applications;

  const approvedJobs = allJobs?.filter((item: any) => item?.approvedStatus);
  const approvedApplications = allApplications?.filter(
    (item: any) => item?.status === "approved"
  );

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Jobs Section */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <Link href="/admin/posted/jobs" className="w-full" data-tip="Click">
          <ApplicationCard
            design="bg-gradient-to-br from-yellow-300 via-yellow-400 to-red-400"
            applications={allJobs}
            title="Posted"
            title2="Jobs"
          />
        </Link>

        <Link href="/admin/approved/jobs" className="w-full" data-tip="Click">
          <ApplicationCard
            design="bg-gradient-to-br from-green-400 via-green-300 to-yellow-300"
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
            design="bg-gradient-to-br from-yellow-300 via-yellow-400 to-red-400"
            applications={allApplications}
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
            design="bg-gradient-to-br from-green-400 via-green-300 to-yellow-300"
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
