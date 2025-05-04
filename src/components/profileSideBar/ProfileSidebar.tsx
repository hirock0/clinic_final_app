"use client";
import { fetchData } from "@/utils/redux/slices/slice";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
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
    <aside className="w-full  bg-white shadow-md h-full p-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className=" w-12 h-12 overflow-hidden rounded-full">
          <Image
            src={user?.image?.secure_url}
            alt={user?.role}
            className=" w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div>
          <div className="">
            <p className="text-lg font-bold">{user?.name}</p>

            <p className="text-sm text-gray-500">{user?.email}</p>
            <p>Role: ({user?.role})</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col space-y-2">
        {navLinks?.map((item: any) => (
          <Link
            key={item?.href}
            href={item?.href}
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
