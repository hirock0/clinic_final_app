"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaSortDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import swal from "sweetalert";
const Nav = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state?.slices?.user);
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [profileMenu, setProfileMenu] = useState(false);

  useEffect(() => {
    const closeMenu = () => {
      setMenuOpen(false);
      setActiveSubMenu(null);
    };
    window.addEventListener("click", closeMenu);
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const logoutHandler = async () => {
    try {
      const response = await axios.get("/pages/api/user/logout");

      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        await signOut();
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

  // ✅ This return should come after all hooks are called
  if (
    pathname?.startsWith("/employee/dashboard") ||
    pathname?.startsWith("/use")
  ) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 main-bg-color shadow-lg">
      <div className="max-w-[1440px] w-11/12 mx-auto flex items-center justify-between">
        {/* Logo and Mobile Menu Button */}
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
            } h-full second-text-color font-semibold scroll-removed max-lg:overflow-y-scroll max-lg:transition-all max-lg:fixed z-50 max-lg:left-0 max-lg:top-26.5 max-lg:flex-col max-lg:backdrop:filter max-lg:bg-blue-700/40 max-lg:pb-30 max-lg:backdrop-blur-3xl max-lg:h-full max-lg:w-5/6 max-lg:items-start flex items-center lg:gap-5`}
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
                      <ul className="text-nowrap">
                        {item.subLinks.map((subItem, subIndex) => (
                          <Link key={subIndex} href={subItem.href}>
                            <li className="hover:underline hover:underline-offset-4 underline-color decoration-2 decoration-[#fdd25f] py-4">
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

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          <Link href="/get-started">
            <button className="uppercase px-5 py-2 rounded purple-color-btn text-white shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
              Get Started
            </button>
          </Link>

          <div>
            {!userData ? (
              <Link href={"/user/login"}>
                <button>Login</button>
              </Link>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenu(!profileMenu);
                }}
                className="w-10 h-10 cursor-pointer rounded-full overflow-hidden"
              >
                {userData?.image?.secure_url && (
                  <Image
                    src={userData.image.secure_url}
                    alt="user"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {profileMenu && (
        <div className="fixed right-0 top-20 bg-red-300">
          <button onClick={logoutHandler} className="cursor-pointer">
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
