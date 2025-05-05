"use client";
import ApplicationCard from "@/components/(dashboards)/applicationCard/ApplicationCard";
import Linechart from "@/components/(dashboards)/charts/lineChart/Linechart";
import { fetchData } from "@/utils/redux/slices/slice";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const DashboardPage = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((state: any) => state?.slices);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <Link
          href={`/user/applied/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-red-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={allJobs?.appliedJobs}
            title="Applied"
          />
        </Link>
        <Link
          href={`/user/accepted/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-green-300 via-yellow-300 text-2xl to-yellow-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={allJobs?.acceptedJobs}
            title="Accepted"
          />
        </Link>
        <Link
          href={`/user/rejected/jobs`}
          className=" w-full tooltip tooltip-bottom"
          data-tip="Click"
        >
          <ApplicationCard
            design={
              " cursor-pointer text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-red-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105"
            }
            applications={allJobs?.rejectedJobs}
            title="Rejected"
          />
        </Link>
      </div>
      <div className="">
        <Linechart />
      </div>
    </div>
  );
};

export default DashboardPage;
