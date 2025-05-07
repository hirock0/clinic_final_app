export const dynamic = "force-dynamic";
import { AllJobs } from "@/app/actions/apis/Apis";
import JobCard from "@/components/jobcard/JobCard";
import FilterSidebar from "@/components/filters-Sidebar/FilterSidebar";
import { FaCalendarTimes } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
const JobsPage = async () => {
  const reqAllJobs = await AllJobs();
  const allJobs = await reqAllJobs.allJobs;
  const approvedJobs = await allJobs?.filter(
    (item: any) => item?.approvedStatus === true
  );
  return (
    <section className="">
      {/* filter sidebar */}
      <div className="second-bg-color py-4 md:py-8 ">
        <FilterSidebar />
      </div>

      {/* Job Cards */}
      <div className="max-w-[1440px] w-11/12 mx-auto gap-6 py-12 md:py-20 ">
        {approvedJobs?.length === 0 ? (
          <div className=" ">
            <>
              <Head>
                <title>Date Not Available</title>
              </Head>
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
                <FaCalendarTimes className="text-red-500 text-6xl mb-4" />
                <h1 className="text-3xl font-semibold mb-2">
                  Date Not Available
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  The date you selected is currently not available. Please
                  choose a different one.
                </p>
                <Link
                  href="/"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Go Back Home
                </Link>
              </div>
            </>
          </div>
        ) : (
          <JobCard jobs={approvedJobs} />
        )}
      </div>
    </section>
  );
};

export default JobsPage;
