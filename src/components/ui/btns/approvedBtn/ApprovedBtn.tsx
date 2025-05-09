"use client";

import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
        className={`flex justify-center second-bg-color text-white rounded-sm shadow-md w-32 h-10 items-center gap-2 text-sm transition
    ${
      status || loading
        ? "opacity-60 cursor-not-allowed"
        : "hover:scale-105 active:scale-100"
    }
    ${loading ? "text-gray-500" : "text-green-600"}
  `}
      >
        {loading ? (
          <>
            <AiOutlineLoading3Quarters size={20} className="animate-spin" />
            Approving...
          </>
        ) : (
          <>
            <FaCheckCircle size={20} />
            Approve
          </>
        )}
      </button>
    </div>
  );
};

export default ApprovedBtn;
