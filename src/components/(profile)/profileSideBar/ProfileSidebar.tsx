"use client";
import { fetchData } from "@/utils/redux/slices/slice";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
  const { user } = useSelector((state: any) => state?.slices);

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`/pages/api/logout`);
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        await signOut();
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

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <aside className="w-full sm:max-w-xs bg-white shadow-lg rounded-xl h-full p-5 space-y-4 transition-all">
      {/* User Profile */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm main-text-color font-medium">
            Role: {user?.role}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {navLinks?.map((item: any) => (
          <Link
            key={item?.href}
            href={item?.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              pathname === item?.href
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-[#fff6d7]"
            }`}
          >
            <span className="text-xl">{item?.icon}</span>
            <span className="truncate">{item?.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div>
        <button
          onClick={logoutHandler}
          className="w-full text-center bg-red-500 hover:scale-105 active:scale-100 text-white font-semibold py-2 rounded-md cursor-pointer transition"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
