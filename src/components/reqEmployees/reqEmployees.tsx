"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import { FaSpinner } from "react-icons/fa";
import swal from "sweetalert";
import EmployeeDeleteBtn from "../ui/btns/employeeDeleteBtn/EmployeeDeleteBtn";

interface User {
  name: string;
  email: string;
  isApproved: boolean;
  role: string;
  _id: string;
}

const ReqEmployees = ({
  item,
  setDeleteId,
}: {
  item: User;
  setDeleteId: any;
}) => {
  const dispatch = useDispatch();
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
        swal({ title: response?.data?.message, icon: "success" });
        setIsApproved("approvedEmployee");
      } else {
        swal({ title: response?.data?.message, icon: "warning" });
      }
    } catch (error: any) {
      swal({ title: error.message || "Something went wrong", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="p-3">{item?.name}</td>
      <td className="p-3">{item?.email}</td>
      <td className="p-3">
        <span
          className={` ${isApproved === "employee" ? "badge-warning" : "text-green-700 -success"}`}
        >
          {isApproved === "employee" ? "Pending" : "Approved"}
        </span>
      </td>
      <td className="p-3 flex items-center gap-3">
        <button
          onClick={approveUser}
          className="btn btn-success  btn-sm flex items-center gap-2"
          disabled={loading || isApproved !== "employee"}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Approve"}
        </button>

        <EmployeeDeleteBtn setDeleteId={setDeleteId} item={item} />
      </td>
    </tr>
  );
};
export default ReqEmployees;
