"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaSortDown } from "react-icons/fa";
const Nav = () => {
  const [menuFlag, setMenuflag] = useState(false);

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
      title: "Training",
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
          title: "Why 'United Care Links' for clinical support staffing?",
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
    <nav className=" bg-slate-100">
      <div className=" max-w-11/12 mx-auto h-20 flex ">
        <div className=" w-full flex items-center justify-between ">
          <div className=" max-lg:flex max-lg:items-center max-lg:gap-4">
            <button
              onClick={() => setMenuflag(!menuFlag)}
              className=" lg:hidden"
            >
              <MdMenu size={35} />
            </button>
            <div className="">UNITED CARE LINKS</div>
          </div>
          <div className=" h-full uppercase ">
            <ul
              className={` ${
                !menuFlag
                  ? " max-lg:-translate-x-[110%]"
                  : "max-lg:translate-x-0"
              }  h-full  max-lg:transition-all max-lg:fixed max-lg:left-0 max-lg:top-20 max-lg:flex-col max-lg:bg-slate-400 max-lg:h-full max-lg:w-2/4 max-lg:items-start flex items-center lg:gap-5`}
            >
              {navInfo?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.href}
                  className=" max-lg:w-full  max-lg:hover:bg-slate-200  "
                >
                  {item?.title === "FOR ORGANIZATIONS" ||
                  item?.title === "FOR JOB SEEKERS" ? (
                    <li className=" relative max-lg:flex-col max-lg:items-start group max-lg:w-full  max-lg:border-b max-lg:p-5 flex items-center gap-2  ">
                      <div className="">
                        <span>{item?.title}</span>

                        <button className=" cursor-pointer">
                          <FaSortDown />
                        </button>
                      </div>
                      <div className=" hidden group-hover:block lg:absolute lg:top-5  bg-red-200 p-5">
                        <ul className=" list-disc list-inside text-nowrap">
                          {item?.subLinks?.map((item, index) => (
                            <Link key={index} href={item?.href}>
                              <li className=" py-4">{item?.title}</li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li className=" max-lg:w-full  max-lg:border-b max-lg:p-5  ">
                      {item?.title}
                    </li>
                  )}
                </Link>
              ))}
            </ul>
          </div>
          <div className="">
            <button className=" border px-5 py-2 rounded shadow">
              get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
