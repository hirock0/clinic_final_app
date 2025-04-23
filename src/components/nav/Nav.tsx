"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaSortDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Nav = () => {
  const [menuFlag, setMenuflag] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<any>(null);

  useEffect(() => {
    const hander = () => {
      setMenuflag(false);
      setActiveSubMenu(null);
    };
    window.addEventListener("click", hander);
    return () => {
      window.removeEventListener("click", hander);
    };
  }, []);

  const navInfo = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Jobs",
      href: "/",
    },
    {
      title: "FOR ORGANIZATIONS",
      href: "/",
      subLinks: [
        {
          title: "How we can help",
          href: "/",
        },
        {
          title: "Clinical support staffing",
          href: "/",
        },
        {
          title: " Book an appointment.r",
          href: "/",
        },
      ],
    },

    {
      title: "FOR JOB SEEKERS",
      href: "/",
      subLinks: [
        {
          title: "Search Jobs",
          href: "/",
        },
        {
          title: "Why ‘United Care Links’",
          href: "/",
        },
        {
          title: " Help Center",
          href: "/",
        },
        {
          title: " View Job Board",
          href: "/",
        },
      ],
    },
    {
      title: "Contact",
      href: "/",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 main-bg-color shadow-lg">
      <div className="max-w-[1440px] w-11/12 mx-auto flex items-center justify-between py-8">
        <div className="max-lg:flex max-lg:items-center max-lg:gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation(), setMenuflag(!menuFlag);
            }}
            className=" lg:hidden"
          >
            <MdMenu size={35} className={`${menuFlag && "hidden"}`} />
            <IoClose size={35} className={`${!menuFlag && "hidden"}`} />
          </button>
          <h1
            className={` -tracking-[1px] text-2xl max-sm:text-base text-center max-sm:leading-4 font-black text-primary-color `}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            UNITED <span className="accent-text-color">CARE</span>{" "}
            <br className=" sm:hidden" />
            LINKS
          </h1>
        </div>
        <div className="uppercase max-[1400px]:text-sm max-lg:text-base">
          <div
            onClick={(e) => e.stopPropagation()}
            className={` ${
              !menuFlag ? " max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            }  h-full text-primary-color font-semibold scroll-removed max-lg:overflow-y-scroll max-lg:transition-all max-lg:fixed z-50 max-lg:left-0 max-lg:top-26.5 max-lg:flex-col max-lg:backdrop:filter max-lg:bg-blue-700/40 max-lg:pb-30 max-lg:backdrop-blur-3xl max-lg:h-full max-lg:w-5/6 max-lg:items-start flex items-center lg:gap-5`}
          >
            {navInfo?.map((item, index) => (
              <ul
                key={index}
                className=" max-lg:w-full  max-lg:hover:bg-blue-200/20 "
              >
                {item?.title === "FOR ORGANIZATIONS" ||
                item?.title === "FOR JOB SEEKERS" ? (
                  <li
                    className="cursor-pointer relative max-lg:flex-col max-lg:items-start group max-lg:w-full max-lg:border-b max-lg:border-b-indigo-600 max-lg:p-5 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSubMenu(
                        activeSubMenu === item?.title ? null : item?.title
                      );
                    }}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className="max-lg:text-white">{item?.title}</span>
                      <button className="cursor-pointer">
                        <FaSortDown />
                      </button>
                    </div>

                    {/* Submenu */}
                    <div
                      className={`${
                        activeSubMenu === item.title ? "block" : "hidden"
                      } lg:group-hover:block  lg:absolute lg:top-5 z-50 bg-white rounded shadow p-5`}
                    >
                      <ul className=" text-nowrap">
                        {item?.subLinks?.map((item, index) => (
                          <Link key={index} href={item?.href}>
                            <li className="hover:underline hover:underline-offset-4 underline-color decoration-2 decoration-[#fdd25f] py-4">
                              {item?.title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <Link href={item?.href}>
                    <li className="max-lg:w-full max-lg:text-white hover:underline hover:underline-offset-4 underline-color decoration-2 max-lg:border-b decoration-[#fdd25f] max-lg:border-b-indigo-600 max-lg:p-5">
                      {item?.title}
                    </li>
                  </Link>
                )}
              </ul>
            ))}
          </div>
        </div>
        <div className="">
          <Link href={"#"}>
            <button className="  px-5 py-2 rounded second-bg-color text-white shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
              get started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
