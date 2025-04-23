import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import CtaBtn from "../ui/ctaBtn/CtaBtn";

const Opportunity = () => {
  return (
    <section className="relative py-12 lg:py-20 max-w-[1440px] mx-auto w-11/12 bg-[#002454] rounded-2xl my-10 lg:my-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/CTA-Full-Width-Texture.png"
          alt="Job opportunity background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/5 rounded-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 sm:px-8">
        <div className=" text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
            Looking for Your Next Job Opportunity?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto">
            Match your unique skills with in-demand jobs at growing
            organizations — and positively impact your life — by working with a
            trusted career partner.
          </p>

          <div className="inline-flex flex-col justify-center gap-4">
            <CtaBtn />
            <Link
              href="#"
              className=" font-semibold text-lg lg:text-2xl cursor-pointer transition-colors duration-200 relative group tracking-wide"
            >
              <span className="relative inline-block pb-[2px]">
                WHY WORK AT MEDIX
                {/* Persistent underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#63e6b8] mt-[2px]"></span>
                {/* Hover underline animation */}
                <span
                  className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cf2e2e] 
                          transition-all duration-300 group-hover:w-full mt-[2px]"
                ></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunity;
