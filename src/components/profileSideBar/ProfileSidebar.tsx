"use client";
import { fetchData } from "@/utils/redux/slices/slice";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle, FaTachometerAlt, FaCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const navItems = [
  { href: "/profile", label: "Dashboard", icon: <FaTachometerAlt /> },
  { href: "/profile/settings", label: "Settings", icon: <FaCog /> },
];

export default function ProfileSidebar({flag}:{flag:string}) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const employeeData = useSelector((state: any) => state?.slices?.employee);
  const userData = useSelector((state: any) => state?.slices?.user);
  const [menuFlag, setMenuFlag] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const logoutHandler = async () => {
    try {
      const endpoint =
        flag === "user"
          ? "/pages/api/user/logout"
          : "/pages/api/employee/logout";
      const response = await axios.get(endpoint);
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

  useEffect(() => {
    const handler = () => {
      setMenuFlag(false);
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);


  return (
    <aside className="w-full sm:w-64 bg-white shadow-md h-full p-4 space-y-6">
      <div className="flex items-center gap-3">
        <FaUserCircle size={40} className="text-blue-500" />
        <div>
          <p className="text-lg font-bold">Your Name</p>
          <p className="text-sm text-gray-500">your@email.com</p>
        </div>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
              pathname === item.href ? "bg-blue-500 text-white" : "text-gray-700"
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
