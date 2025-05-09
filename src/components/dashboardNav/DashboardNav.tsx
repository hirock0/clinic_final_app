// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import ProfileSidebar from "../profileSideBar/ProfileSidebar";
import {
  adminSideNavLink,
  userSideNavLink,
  employeeSideNavLink,
  institutionalSideNavLink,
} from "../allNavLinks/AllNavLinks";
import { usePathname } from "next/navigation";
import DashboardSideBar from "../dashboardSideBar/DashboardSideBar";

const DashboardNav = ({ flag, navLinks }: { flag: string; navLinks: any }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.slices);
  const [menuFlag, setMenuFlag] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  useEffect(() => {
    const handler = () => {
      setProfileMenu(false);
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return (
    <nav className="soft-bg-purple sticky top-0 z-50">
      <div className="h-20 relative max-w-[1440px] mx-auto w-11/12 flex items-center justify-between">
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
        </div>
        {/* ---------------- */}
        <div className="flex items-center gap-5">
          <button className="relative">
            <div className="absolute h-2 w-2 rounded-full bg-red-500"></div>
            <IoMdNotifications size={25} />
          </button>
          {flag === "admin" && <Link href={"/admin/login"}>Login</Link>}
          <div>
            {hasMounted ? (
              user ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileMenu(!profileMenu);
                  }}
                  className="w-10 h-10 cursor-pointer rounded-full overflow-hidden"
                >
                  <Image
                    src={user?.image?.secure_url}
                    alt="user"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </button>
              ) : (
                <div className="loading loading-spinner"></div>
              )
            ) : null}
          </div>
        </div>
        {/* profile_popup */}
        {profileMenu && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-50 right-0 top-20"
          >
            <ProfileSidebar navLinks={navLinks} flag={flag} />
          </div>
        )}
        {/* profile_popup_end */}

        {/* ------------------------------------ */}
        {pathname.startsWith("/admin") && (
          <aside
            onClick={(e) => e.stopPropagation()}
            className={`${
              !menuFlag ? "max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            } transition-all z-50 fixed left-0 top-20 h-screen overflow-y-scroll soft-bg-purple shadow-md p-6 hidden max-lg:block`}
          >
            <DashboardSideBar navLinks={adminSideNavLink} />
          </aside>
        )}
        {/* --------------------------- */}
        {pathname.startsWith("/user") && (
          <aside
            onClick={(e) => e.stopPropagation()}
            className={`${
              !menuFlag ? "max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            } transition-all fixed z-50 left-0 top-20 h-screen overflow-y-scroll soft-bg-purple shadow-md p-6 hidden max-lg:block`}
          >
            <DashboardSideBar navLinks={userSideNavLink} />
          </aside>
        )}
        {/* --------------------------- */}
        {pathname.startsWith("/employee") && (
          <aside
            onClick={(e) => e.stopPropagation()}
            className={`${
              !menuFlag ? "max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            } transition-all fixed z-50 left-0 top-20 h-full overflow-y-scroll soft-bg-purple shadow-md p-6 hidden max-lg:block`}
          >
            <DashboardSideBar navLinks={employeeSideNavLink} />
          </aside>
        )}
        {/* --------------------------- */}
        {pathname.startsWith("/institutional") && (
          <aside
            onClick={(e) => e.stopPropagation()}
            className={`${
              !menuFlag ? "max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            } transition-all fixed z-50 left-0 top-20 h-full overflow-y-scroll soft-bg-purple shadow-md p-6 hidden max-lg:block`}
          >
            <DashboardSideBar navLinks={institutionalSideNavLink} />
          </aside>
        )}
      </div>
    </nav>
  );
};

export default DashboardNav;
