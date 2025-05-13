"use client";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { IoTrashOutline } from "react-icons/io5";
import { FaTimes, FaTrash } from "react-icons/fa";
const ApplicationDelBtn = ({
  app,
  applicationHandler,
}: {
  app: any;
  applicationHandler: any;
}) => {
  const [popupFlag, setPopupFlag] = useState(false);
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
        setPopupFlag(false);
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
    <div className="">
      <button
        onClick={() => setPopupFlag(!popupFlag)}
        disabled={loading}
        className="flex items-center gap-1 text-red-600 hover:text-red-800 transition duration-200 text-sm font-medium disabled:opacity-50"
      >
        <IoTrashOutline className="text-lg" />
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
                onClick={deleteHandler}
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

export default ApplicationDelBtn;
