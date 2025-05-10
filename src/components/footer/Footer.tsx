"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Footer = () => {
  const pathname = usePathname();

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employee") ||
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/awaiting") ||
    pathname.startsWith("/institutional") ||
    pathname?.startsWith("/job") ||
    pathname?.startsWith("/application")
  ) {
    return null;
  }
  return (
    <footer className={` bg-[#1e1e1e] border-t-1 border-[#1e1e1e] text-[#ececec]`}>
      <div className="max-w-[1400px] w-11/12 mx-auto pt-12 md:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 ">
          <div className="flex flex-col space-y-1 lg:col-span-2">
            <Image src='/UCL logo.png' alt="ucl logo" height={100} width={100} />
            <p className="lg:max-w-[350px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet id asperiores consequuntur similique earum.</p>
          </div>
          <nav className="flex flex-col space-y-4">
            <h6 className="font-semibold text-lg accent-text-color">Services</h6>
            <Link href={"/pricing"} className="link link-hover">
              Hire Talent
            </Link>
            <Link href={"#"} className="link link-hover">
              Search Jobs
            </Link>
            <Link href={"#"} className="link link-hover">
              Caregiver Links
            </Link>
          </nav>
          <nav className="flex flex-col space-y-4">
            <h6 className=" font-semibold text-lg accent-text-color">Company</h6>
            <Link href={"/pricing"} className="link link-hover">
              Pricing
            </Link>
            <Link href={"/contact"} className="link link-hover">
              Contact
            </Link>
            <Link href={"/help-center"} className="link link-hover">
              Help Center
            </Link>
          </nav>
          <nav className="flex flex-col space-y-4">
            <h6 className="accent-text-color font-semibold text-lg">Legal</h6>
            <Link href={"/how-we-help"} className="link link-hover">
              How We Can Help
            </Link>
            <Link href={"/clinical-support-staffing"} className="link link-hover">
              Clinical Support Staffing
            </Link>

            <Link href={"/why-ucl"} className="link link-hover">
              Why United Care Links
            </Link>
          </nav>
        </div>


        <div className="border-t border-[#454545] mt-6">
          <p className="text-center text-sm mt-6 text-[#6c6c6c]">© {new Date().getFullYear()} United Care Links. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
