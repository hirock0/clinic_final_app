"use client";
import Link from "next/link";
import { useState } from "react";
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
    <nav className=" bg-primary-color">
      <div className="max-w-[1440px] w-11/12 mx-auto flex items-center justify-between py-8">
        <div className="max-lg:flex max-lg:items-center max-lg:gap-4">
          <button onClick={() => setMenuflag(!menuFlag)} className=" lg:hidden">
            <MdMenu size={35} />
          </button>
          <h1
            className="text-2xl font-black text-primary-color"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            UNITED CARE LINKS
          </h1>
        </div>
        <div className="uppercase">
          <ul
            className={` ${
              !menuFlag ? " max-lg:-translate-x-[110%]" : "max-lg:translate-x-0"
            }  h-full  max-lg:transition-all max-lg:fixed max-lg:left-0 max-lg:top-20 max-lg:flex-col max-lg:bg-slate-400 max-lg:h-full max-lg:w-2/4 max-lg:items-start flex items-center lg:gap-5`}
          >
            {navInfo?.map((item, index) => (
              <div
                key={index}
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
                    <div className=" hidden group-hover:block lg:absolute lg:top-5 z-50 bg-white rounded shadow p-5">
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
                  <Link href={item?.href}>
                    <li className=" max-lg:w-full  max-lg:border-b max-lg:p-5  ">
                      {item?.title}
                    </li>
                  </Link>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className="">
          <button className=" border px-5 py-2 rounded shadow">
            get started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
