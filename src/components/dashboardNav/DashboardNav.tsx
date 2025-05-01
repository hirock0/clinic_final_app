// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import axios from "axios";
import swal from "sweetalert";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import { signOut } from "next-auth/react";
const DashboardNav = ({ navInfo, flag }: { navInfo: any; flag: string }) => {
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
    <nav className="bg-slate-200">
      <div className="h-20 max-w-[1440px] mx-auto w-11/12 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex max-lg:gap-5 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuFlag(!menuFlag);
              }}
              className="cursor-pointer lg:hidden"
            >
              <LuMenu size={30} />
            </button>
            <Link href={"/"}>
              <h1
                className="-tracking-[1px] text-2xl max-sm:text-base text-center max-sm:leading-4 font-black main-text-color"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                UNITED <span className="second-text-color">CARE</span>
                <br className="sm:hidden" />
                LINKS
              </h1>
            </Link>
          </div>
          <ul
            onClick={(e) => e.stopPropagation()}
            className={`${
              !menuFlag ? "max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            } transition-all max-lg:fixed max-lg:flex-col max-lg:bg-slate-400 max-lg:top-20 max-lg:left-0 max-lg:items-start max-lg:p-5 flex items-center gap-5`}
          >
            {navInfo?.map((item: any, index: any) => (
              <Link key={index} href={"/dashboard/find_Job"}>
                <li>{item?.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        {/* ---------------- */}
        <div className="flex items-center gap-5">
          <button className="relative">
            <div className="absolute h-2 w-2 rounded-full bg-red-500"></div>
            <IoMdNotifications size={25} />
          </button>
          <div>
            {(flag === "user" && userData?.image?.secure_url) ||
            (flag === "employee" && employeeData?.image?.secure_url) ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenu(!profileMenu);
                }}
                className="w-10 h-10 cursor-pointer rounded-full overflow-hidden"
              >
                <Image
                  src={
                    flag === "user"
                      ? userData.image.secure_url
                      : employeeData.image.secure_url
                  }
                  alt="user"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {/* profile_popup */}
      {profileMenu && (
        <div className="fixed right-0 top-20 bg-red-300">
          <button onClick={logoutHandler} className="cursor-pointer">
            Log Out
          </button>
        </div>
      )}
      {/* profile_popup_end */}
    </nav>
  );
};

export default DashboardNav;
