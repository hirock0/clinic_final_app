import React from "react";
import Hire_Talent from "../../ui/btns/ctaBtn/hire_talent/Hire_Talent";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 lg:py-24">
      {/* for mobile device */}
      <div className="lg:hidden absolute inset-0 bg-cover bg-center z-0" style={{
        backgroundImage: "url('/second-banner.jpg')",
      }}>
      </div>

      {/* for desktop device */}
      <div className="hidden lg:block absolute inset-0 bg-cover bg-center z-0" style={{
        backgroundImage: "url('/custom-banner.png')",
      }}>
      </div>


      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 lg:bg-black/5 z-0"></div>
      <div className="relative z-10 max-w-[1440px] mx-auto w-11/12 text-left">
        <h1
          className="max-w-4xl text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 tracking-wider uppercase text-white lg:text-[#308d89]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Your Reliable Partner in Healthcare Staffing and Workforce Development.
        </h1>
        <p className="text-base lg:text-lg mb-6 md:mb-8 text-gray-200 lg:text-gray-600 max-w-[680px]">
          Helping your mission thrive—by putting the right people in the right places.
          We match meaningful work with world-class talent. Simple as that.
        </p>
        <div className="flex flex-wrap gap-4">
          <Hire_Talent
            design="text-base lg:text-lg font-semibold py-2 px-4 md:py-3 md:px-6 banner-btn1 rounded md:rounded-md transition-colors duration-300 ease-in-out cursor-pointer"
          />
          <Link
            href="/search-jobs"
            className="text-base lg:text-lg font-semibold py-2 px-4 md:py-3 md:px-6  banner-btn2 rounded md:rounded-md  transition-colors duration-300 ease-in-out cursor-pointer flex items-center gap-1"
          >
            SEARCH JOBS
            <span className="ml-1 text-xs md:text-sm">
              <FaExternalLinkAlt />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
