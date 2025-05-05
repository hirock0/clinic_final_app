"use client";
import Link from "next/link";
import Hire_Talent from "@/components/ui/btns/ctaBtn/hire_talent/Hire_Talent";
const GetStartedPage = () => {
  return (
    <section className="max-w-[1440px] mx-auto w-11/12 flex items-center flex-col justify-center py-12 lg:py-20">
      <div className="mx-auto text-center mb-6 md:mb-10">
        <h1 className="main-text-color text-4xl font-black mb-4">
          Get Started With UCL
        </h1>
        <p className="text-xl font-medium">
          We help companies find great talent — and great talent find great
          jobs.
        </p>
      </div>

      {/* link container  */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 ">
        {/* Hire talent card  */}
        <div className=" p-10  rounded-md shadow  flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-black main-text-color mb-2">
            For Organizations
          </h3>
          <p className="text-base font-normal mb-6">
            Hire highly skilled healthcare and life sciences talent with UCL.
          </p>
          <Hire_Talent
            design={
              "second-bg-color third-text-color border-2 main-border-color rounded-md px-6 py-2 text-lg font-semibold cursor-pointer"
            }
          />
        </div>
        {/* search jobs card  */}
        <div className=" p-10  rounded-md shadow  flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-black main-text-color mb-2">
            For Job Seekers
          </h3>
          <p className="text-base font-normal mb-6">
            Considering your next opportunity? Find it now with UCL.
          </p>
          <Link
            href="/search-jobs"
            className="second-bg-color third-text-color border-2 main-border-color rounded-md px-6 py-2 text-lg font-semibold cursor-pointer "
          >
            SEARCH JOBS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStartedPage;
