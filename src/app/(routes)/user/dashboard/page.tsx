"use client";
import { fetchData } from "@/utils/redux/slices/slice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 60 },
];
const DashboardPage = () => {
  const dispatch = useDispatch();
  const allAppliedJobs = useSelector(
    (state: any) => state?.slices?.appliedJobs
  );
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div className=" flex flex-col gap-5">
      <div className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center gap-5">
        <div className=" text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-yellow-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105">
          <h1 className=" tracking-tight">Total I have applied</h1>
          <div className="">
            {!allAppliedJobs ? (
              <div className=" loading loading-spinner"></div>
            ) : (
              <h1>{allAppliedJobs?.length}</h1>
            )}
          </div>
        </div>
        <div className=" text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-yellow-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105">
          <h1 className=" tracking-tight">Total I have applied</h1>
          <div className="">
            {!allAppliedJobs ? (
              <div className=" loading loading-spinner"></div>
            ) : (
              <h1>{allAppliedJobs?.length}</h1>
            )}
          </div>
        </div>
        <div className=" text-center flex-col gap-2 bg-gradient-to-tl from-yellow-300 via-yellow-300 text-2xl to-yellow-400 w-full   h-52 rounded-xl p-5 flex items-center justify-center shadow-xl lg:hover:scale-105">
          <h1 className=" tracking-tight">Total I have applied</h1>
          <div className="">
            {!allAppliedJobs ? (
              <div className=" loading loading-spinner"></div>
            ) : (
              <h1>{allAppliedJobs?.length}</h1>
            )}
          </div>
        </div>
      </div>
      <div className=" bg-yellow-700/5 shadow-xl rounded-xl px-2 ">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
