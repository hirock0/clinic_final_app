"use client";

import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { fetchData } from "@/utils/redux/slices/slice";

const ReqEmployees = ({ item }: { item: string | object | any }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user } = useSelector((state: any) => state?.slices);

  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(item?.role);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const approveUser = async () => {
    setLoading(true);
    try {
      const userData = {
        email: item?.email,
        role: user?.role,
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
        setIsApproved("approvedEmployee");
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
        {isApproved === "employee" ? "Pending" : "Approved"}
      </td>

      <td className="p-2 border">
        {
          <button
            onClick={approveUser}
            className="bg-green-500 text-white w-32 justify-center h-12 px-3 py-1 rounded hover:bg-green-600 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Approved"}
          </button>
        }
      </td>
    </tr>
  );
};

export default ReqEmployees;
