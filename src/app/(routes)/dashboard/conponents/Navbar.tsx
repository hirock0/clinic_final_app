"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import axios from "axios";
import useUserStore from "@/utils/zustand/store/useUserStore";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const { user, clearUser } = useUserStore();
  const [menuFlag, setMenuFlag] = useState(false);
  const logoutHandler = async () => {
    try {
      const response = await axios.get("/pages/api/authentication/logout");
      if (response?.data?.success) {
        clearUser();
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
        router.push("/login");
      } else {
        swal({
          title: "Something goes wrong!",
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

  return (
    <nav className=" bg-slate-200">
      <div className=" 0 h-20 max-w-[1440px] mx-auto w-11/12 flex items-center justify-between">
        <div className=" flex items-center gap-5">
          <div className=" flex max-lg:gap-5 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation(), setMenuFlag(!menuFlag);
              }}
              className=" cursor-pointer lg:hidden"
            >
              <LuMenu size={30} />
            </button>
            <h1
              className={` -tracking-[1px] text-2xl max-sm:text-base text-center max-sm:leading-4 font-black main-text-color `}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              UNITED <span className="second-text-color">CARE</span>{" "}
              <br className=" sm:hidden" />
              LINKS
            </h1>
          </div>
          <ul
            onClick={(e) => e.stopPropagation()}
            className={` ${
              !menuFlag
                ? " max-lg:-translate-x-[110%]"
                : " max-lg:translate-x-0"
            } transition-all max-lg:fixed max-lg:flex-col max-lg:bg-slate-400 max-lg:top-20 max-lg:left-0 max-lg:items-start max-lg:p-5 flex items-center gap-5`}
          >
            <Link href={"/dashboard/find_Job"}>
              <li>Find Job</li>
            </Link>
            <Link href={"/dashboard/find_Job"}>
              <li>Company Application</li>
            </Link>
            <Link href={"/dashboard/find_Job"}>
              <li>Company Reviews</li>
            </Link>
          </ul>
        </div>
        {/* ---------------- */}
        <div className=" flex items-center gap-5">
          <button className=" relative">
            <div className=" absolute h-2 w-2 rounded-full bg-red-500"></div>
            <IoMdNotifications size={25} />
          </button>
          <div className="">
            {!user ? (
              <Link href={"/login"}>
                <button>Login</button>
              </Link>
            ) : (
              <button onClick={logoutHandler} className=" cursor-pointer">
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
