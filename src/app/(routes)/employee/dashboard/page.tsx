export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Link from "next/link";
import { FindAllApplications } from "@/app/actions/apis/Apis";
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
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/employee/posted/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            applications={unApprovedJobs}
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
            applications={unApprovedApplications}
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
