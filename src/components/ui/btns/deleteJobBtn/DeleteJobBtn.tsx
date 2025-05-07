"use client";

import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { IoTrashOutline } from "react-icons/io5";
const DeleteJobBtn = ({
  job,
  deleteHandler,
}: {
  job: any;
  deleteHandler: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/pages/api/admin/job/delete", {
        id: job?._id,
      });
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        deleteHandler(job?._id);
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
    <div className="">
      <button
        onClick={handleDelete}
        className="flex bg-slate-300 rounded-sm shadow-md hover:scale-105 active:scale-100 p-2 items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
      >
        <IoTrashOutline size={18} />
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteJobBtn;
