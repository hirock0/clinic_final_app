"use client";

import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { IoTrashOutline } from "react-icons/io5";
import { FaTimes, FaTrash } from "react-icons/fa";
const DeleteJobBtn = ({
  job,
  deleteHandler,
}: {
  job: any;
  deleteHandler: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [popupFlag, setPopupFlag] = useState(false);
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
        setPopupFlag(false);
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
        onClick={() => setPopupFlag(!popupFlag)}
        className="flex justify-center accent-bg-color rounded-sm shadow-md hover:scale-105 active:scale-100 w-32 h-10 items-center text-sm transition"
      >
        <div className=" flex gap-2 items-center">
          <IoTrashOutline size={20} />
          {loading ? "Deleting..." : "Delete"}
        </div>
      </button>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition ${
          popupFlag ? "visible opacity-100" : "invisible opacity-0"
        } bg-black/50 duration-300`}
      >
        <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative animate-fade-in-down">
          {/* Close Button */}
          <button
            onClick={() => setPopupFlag(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-lg"
            aria-label="Close"
          >
            <FaTimes />
          </button>

          {/* Modal Content */}
          <div className="text-center">
            <FaTrash className="text-red-500 text-3xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPopupFlag(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                {!loading ? (
                  "Delete"
                ) : (
                  <div className=" loading loading-spinner"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobBtn;
