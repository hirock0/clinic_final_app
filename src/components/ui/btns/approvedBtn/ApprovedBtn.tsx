"use client";

import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";

const ApprovedBtn = ({ job }: { job: any }) => {
  const [status, setStatus] = useState<boolean>(job?.approvedStatus);
  const [loading, setLoading] = useState<boolean>(false);
  const handleApprove = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/pages/api/admin/job/approvedment", {
        id: job?._id,
      });
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        setStatus(true);
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between mt-5">
      <p
        className={`text-xs font-medium mt-1 ${
          status ? "text-green-600" : "text-orange-500"
        }`}
      >
        {status ? "✅ Approved Application" : "⏳ Not Approved Yet"}
      </p>

      <button
        onClick={handleApprove}
        disabled={status || loading}
        className={`text-sm bg-slate-300 rounded-sm shadow-md p-2 transition 
          ${
            status || loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:scale-105 active:scale-100"
          }
          ${loading ? "text-gray-500" : "text-green-600 hover:text-green-800"}`}
      >
        {loading ? "Approving..." : "Approve"}
      </button>
    </div>
  );
};

export default ApprovedBtn;
