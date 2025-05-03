"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaSortDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import { FaTachometerAlt, FaCog } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import ProfileSidebar from "../profileSideBar/ProfileSidebar";

const Nav = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state?.slices?.user);
  const institutionalData = useSelector(
    (state: any) => state?.slices?.institutionalUser
  );
  const employeeData = useSelector((state: any) => state?.slices?.employee);

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const closeAll = () => {
      setMenuOpen(false);
      setActiveSubMenu(null);
      setProfileMenu(false);
      setLoginDropdownOpen(false);
    };

    window.addEventListener("click", closeAll);
    return () => {
      window.removeEventListener("click", closeAll);
    };
  }, []);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Training", href: "/" },
    {
      title: "FOR ORGANIZATIONS",
      href: "/",
      subLinks: [
        { title: "How we can help", href: "/" },
        { title: "Clinical support staffing", href: "/" },
        { title: "Book an appointment", href: "/" },
      ],
    },
    {
      title: "FOR JOB SEEKERS",
      href: "/",
      subLinks: [
        { title: "Search Jobs", href: "/" },
        { title: "Why United Care Links", href: "/" },
        { title: "Help Center", href: "/" },
        { title: "View Job Board", href: "/" },
      ],
    },
    { title: "Contact", href: "/contact" },
  ];

  const role =
    (employeeData && "employee") ||
    (institutionalData && institutionalData.role) ||
    (userData && userData.role);

  const navLinks = [
    {
      href: `/${role}/dashboard`,
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    { href: "/profile/settings", label: "Settings", icon: <FaCog /> },
  ];

  if (!hasMounted) return null;
  if (
    pathname?.startsWith("/employee/dashboard") ||
    pathname?.startsWith("/use") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/institutional")
  ) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 main-bg-color shadow-lg">
      <div className="max-w-[1440px] w-11/12 mx-auto flex items-center justify-between">
        {/* Logo and Mobile Toggle */}
        <div className="max-lg:flex max-lg:items-center max-lg:gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="lg:hidden"
          >
            {menuOpen ? <IoClose size={35} /> : <MdMenu size={35} />}
          </button>
          <Image src="/UCL logo.png" alt="logo" width={100} height={50} />
        </div>

        {/* Navigation Links */}
        <div className="uppercase max-[1400px]:text-sm max-lg:text-base">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              !menuOpen ? "max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            } h-full second-text-color font-semibold scroll-removed max-lg:overflow-y-scroll max-lg:transition-all max-lg:fixed z-50 max-lg:left-0 max-lg:top-25 max-lg:flex-col max-lg:backdrop:filter max-lg:bg-blue-700/40 max-lg:pb-30 max-lg:backdrop-blur-3xl max-lg:h-full max-lg:w-5/6 max-lg:items-start flex items-center lg:gap-5`}
          >
            {navItems.map((item, index) => (
              <ul
                key={index}
                className="max-lg:w-full max-lg:hover:bg-blue-200/20"
              >
                {item.subLinks ? (
                  <li
                    className="cursor-pointer relative max-lg:flex-col max-lg:items-start group max-lg:w-full max-lg:border-b max-lg:border-b-indigo-600 max-lg:p-5 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSubMenu(
                        activeSubMenu === item.title ? null : item.title
                      );
                    }}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className="max-lg:text-white">{item.title}</span>
                      <FaSortDown />
                    </div>
                    <div
                      className={`${
                        activeSubMenu === item.title ? "block" : "hidden"
                      } lg:group-hover:block lg:absolute lg:top-5 z-50 bg-white rounded shadow p-5`}
                    >
                      <ul className="text-nowrap flex flex-col gap-3">
                        {item.subLinks.map((subItem, subIndex) => (
                          <Link key={subIndex} href={subItem.href}>
                            <li className=" bg-zinc-100 shadow-xl hover:scale-110 rounded-xl px-4  py-4">
                              {subItem.title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <Link href={item.href}>
                    <li className="max-lg:w-full max-lg:text-white hover:underline hover:underline-offset-4 underline-color decoration-2 max-lg:border-b decoration-[#fdd25f] max-lg:border-b-indigo-600 max-lg:p-5">
                      {item.title}
                    </li>
                  </Link>
                )}
              </ul>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 relative">
          <Link href="/get-started">
            <button className="uppercase px-5 py-2 rounded purple-color-btn second-text-color font-medium shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
              Get Started
            </button>
          </Link>

          {/* Login Dropdown or Profile Avatar */}
          <div className="relative">
            {!userData && !institutionalData && !employeeData ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLoginDropdownOpen(!loginDropdownOpen);
                  }}
                  className=" second-bg-color shadow-xl text-white p-2 rounded-md hover:scale-105 transition-all font-semibold"
                >
                  Login
                </button>
                {loginDropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-2 bg-white rounded shadow-lg z-50 w-55 h-32"
                  >
                    <ul className="text-sm text-gray-700 p-2 space-y-2">
                      <Link
                        href="/user/login"
                        className="block hover:scale-105"
                      >
                        <li className=" flex gap-3 items-center px-5 py-2 bg-zinc-100 rounded-full hover:bg-zinc-200 active:bg-zinc-300">
                          <div className=" text-cyan-300">
                            <AiOutlineLogin size={20} />
                          </div>
                          <span>User Login</span>
                        </li>
                      </Link>
                      <Link
                        href="/institutional/login"
                        className="block hover:scale-105 "
                      >
                        <li className="flex gap-3 items-center px-5 py-2 bg-zinc-100 rounded-full hover:bg-zinc-200 active:bg-zinc-300">
                          <div className=" text-cyan-300">
                            <AiOutlineLogin size={20} />
                          </div>
                          <span>Institutional Login</span>
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenu(!profileMenu);
                }}
                className="w-10 h-10 cursor-pointer rounded-full overflow-hidden"
              >
                <Image
                  src={
                    (institutionalData &&
                      institutionalData.image?.secure_url) ||
                    (userData && userData.image?.secure_url) ||
                    (employeeData && employeeData.image?.secure_url)
                  }
                  alt="user"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Profile Popup */}
          {profileMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-25"
            >
              <ProfileSidebar
                navLinks={navLinks}
                flag={
                  userData?.role ||
                  institutionalData?.role ||
                  employeeData?.role
                }
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
