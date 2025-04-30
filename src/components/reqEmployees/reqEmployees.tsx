"use client";

import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ReqEmployees = ({ item }: { item: string | object | any }) => {
  const [loading, setLoading] = useState(false);

  const approveUser = async () => {
    setLoading(true);
    try {
      const userData = {
        email: item?.email,
      };
      const response = await axios.post(
        "/pages/api/admin/approvedEmloyee",
        userData
      );

      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error: any) {
      swal({
        title: error.message || "Something went wrong",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td className="p-2 border">{item?.name}</td>
      <td className="p-2 border">{item?.email}</td>
      <td className="p-2 border">
        {item?.role === "employee" ? "Pending" : "Approved"}
      </td>
      <td className="p-2 border">
        {!item.isApproved ? (
          <button
            onClick={approveUser}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Approving...
              </>
            ) : (
              "Approve"
            )}
          </button>
        ) : (
          <span className="text-gray-500">—</span>
        )}
      </td>
    </tr>
  );
};

export default ReqEmployees;
