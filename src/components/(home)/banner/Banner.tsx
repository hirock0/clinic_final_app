import Image from "next/image";
import React from "react";
import Hire_Talent from "../../ui/btns/ctaBtn/hire_talent/Hire_Talent";
import Search_Jobs from "../../ui/btns/ctaBtn/search_jobs/Search_Jobs";

const Banner = () => {
  return (
    <section className="second-bg-color py-12 lg:py-20">
      {/* Background Image - Bottom Right */}

      {/* Content Container */}
      <div className="max-w-[1440px] mx-auto w-11/12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="text-left max-w-[800px] third-text-color">
          <h1
            className=" text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 tracking-wider uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Your Reliable Partner in Healthcare Staffing and Workforce Development.
          </h1>
          <p className="text-base lg:text-lg mb-6 md:mb-8 lg:mx-0 text-gray-200">
            Helping your mission thrive—by putting the right people in the right
            places. We match meaningful work with world-class talent.Simple as
            that.
          </p>
          <div className="flex justify-start gap-4">
            <Hire_Talent

              design={
                "text-base lg:text-lg font-semibold py-1.5 px-2.5 md:py-2 md:px-4 border-2 rounded md:rounded-md bg-[#ffdb61] text-[#0a0a0a] border-[#ffdb61] hover:bg-transparent hover:text-[#ffdb61] transition-colors duration-300 ease-in-out cursor-pointer"
              }
            />
            <Search_Jobs />
          </div>
        </div>
        {/* Awards */}
        <div className="flex justify-center gap-6 flex-wrap relative z-10 ">
          <Image
            src="/compressed_successful-medical-team.jpg"
            alt="Staffing Awards"
            width={690}
            height={690}
            className="w-full max-w-[690px] h-auto rounded-2xl shadow-lg  "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
