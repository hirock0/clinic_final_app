"use client";
import { fetchData } from "@/utils/redux/slices/slice";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

export default function ProfileSidebar({
  flag,
  navLinks,
}: {
  flag: string;
  navLinks: any;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const employeeData = useSelector((state: any) => state?.slices?.employee);
  const userData = useSelector((state: any) => state?.slices?.user);
  const institutionalData = useSelector(
    (state: any) => state?.slices?.institutionalUser
  );

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        `/pages/api/${flag === "approvedEmployee" ? "employee" : flag}/logout`
      );
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        await signOut();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        swal({
          title: "Something went wrong!",
          icon: "warning",
        });
      }
    } catch (error: any) {
      throw new Error(String(error.message));
    }
  };
  console.log(flag);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <aside className="w-full sm:w-64 bg-white shadow-md h-full p-4 space-y-6">
      <div className="flex items-center gap-3">
        <FaUserCircle size={40} className="text-blue-500" />
        <div>
          <div className="">
            <p className="text-lg font-bold">
              {(flag === "user" && userData?.name) ||
                ((flag === "approvedEmployee" || flag === "employee") &&
                  employeeData?.name) ||
                (flag === "institutional" && institutionalData?.name)}
            </p>

            <p className="text-sm text-gray-500">
              {(flag === "user" && userData?.email) ||
                ((flag === "approvedEmployee" || flag === "employee") &&
                  employeeData?.email) ||
                (flag === "institutional" && institutionalData?.email)}
            </p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col space-y-2">
        {navLinks.map((item: any) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
              pathname === item.href
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="">
        <button onClick={logoutHandler} className="cursor-pointer">
          Log Out
        </button>
      </div>
    </aside>
  );
}
