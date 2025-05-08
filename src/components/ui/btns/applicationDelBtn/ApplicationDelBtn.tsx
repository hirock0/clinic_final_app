"use client";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { IoTrashOutline } from "react-icons/io5";
const ApplicationDelBtn = ({
  app,
  applicationHandler,
}: {
  app: any;
  applicationHandler: any;
}) => {
  const [loading, setLoading] = useState(false);
  const deleteHandler = async () => {
    const confirm = await swal({
      title: "Are you sure?",
      text: "This application will be permanently deleted!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    });

    if (!confirm) return;
    try {
      setLoading(true);
      const id = app?._id;
      const res = await axios.post(`/pages/api/admin/applications/delete`, {
        id: id,
      });
      if (res?.data?.success) {
        swal({
          title: res?.data?.message,
          icon: "success",
        });

        applicationHandler(id);
      } else {
        swal({
          title: res?.data?.message,
          icon: "warning",
        });
      }
    } catch (error: any) {
      swal({
        title: error?.message,
        icon: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={deleteHandler}
      disabled={loading}
      className="flex items-center gap-1 text-red-600 hover:text-red-800 transition duration-200 text-sm font-medium disabled:opacity-50"
    >
      <IoTrashOutline className="text-lg" />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default ApplicationDelBtn;
