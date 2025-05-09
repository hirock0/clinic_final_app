"use client";

import axios from "axios";
import { useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import swal from "sweetalert";

const ApplicationApprovedBtn = ({ app }: { app: any }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(app.status);

  const approveHandler = async () => {
    if (status === "approved") {
      swal("Already Approved", "This application is already approved.", "info");
      return;
    }

    const confirm = await swal({
      title: "Approve Application?",
      text: `Are you sure you want to approve ${app?.fullName}?`,
      icon: "info",
      buttons: ["Cancel", "Yes, approve"],
    });

    if (!confirm) return;

    try {
      setLoading(true);
      const id = app?._id;;
      const res = await axios.post(`/pages/api/admin/applications/approve`, {
        id: id,
      });

      if (res.data.success) {
        setStatus("approved");
        swal({
          title: res?.data?.message,
          icon: "success",
        });
      } else {
        swal({
          title: res?.data?.message,
          icon: "warning",
        });
      }
    } catch (error: any) {
      swal({
        title: error?.message,
        icon: "success",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={approveHandler}
      disabled={loading}
      className={`flex items-center gap-1 ${
        status === "approved"
          ? "text-gray-500"
          : "text-green-600 hover:text-green-800"
      } transition duration-200 text-sm font-medium disabled:opacity-50`}
    >
      <IoCheckmarkDoneCircleOutline className="text-lg" />
      {loading
        ? "Approving..."
        : status === "approved"
        ? "Approved"
        : "Approve"}
    </button>
  );
};

export default ApplicationApprovedBtn;
