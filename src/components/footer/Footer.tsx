"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  return (
    <footer
      className={`
             ${pathname === "/dashboard" && "hidden"}
        bg-primary-color border-t-1 border-gray-500`}
    >
      <div className="footer md:footer-horizontal max-w-[1400px] w-11/12 mx-auto py-12 md:py-20">
        <nav>
          <h6 className="second-text-color font-semibold text-lg">Services</h6>
          <Link href={"#"} className="link link-hover">
            Branding
          </Link>
          <Link href={"#"} className="link link-hover">
            Design
          </Link>
          <Link href={"#"} className="link link-hover">
            Marketing
          </Link>
          <Link href={"#"} className="link link-hover">
            Advertisement
          </Link>
        </nav>
        <nav>
          <h6 className="second-text-color font-semibold text-lg">Company</h6>
          <Link href={"#"} className="link link-hover">
            About us
          </Link>
          <Link href={"#"} className="link link-hover">
            Contact
          </Link>
          <Link href={"#"} className="link link-hover">
            Jobs
          </Link>
          <Link href={"#"} className="link link-hover">
            Press kit
          </Link>
        </nav>
        <nav>
          <h6 className="second-text-color font-semibold text-lg">Legal</h6>
          <Link href={"#"} className="link link-hover">
            Terms of use
          </Link>
          <Link href={"#"} className="link link-hover">
            Privacy policy
          </Link>
          <Link href={"#"} className="link link-hover">
            Cookie policy
          </Link>
        </nav>
        <form>
          <h6 className="second-text-color font-semibold text-lg">
            Newsletter
          </h6>
          <fieldset className="w-80">
            <label>Enter your email address</label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn main-bg-color join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
