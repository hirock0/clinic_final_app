"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
import swal from "sweetalert";
const GetStartedPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const employeeData = useSelector((state: any) => state?.slices?.employee);
  const userData = useSelector((state: any) => state?.slices?.user);
  const institutionalData = useSelector(
    (state: any) => state?.slices?.institutionalUser
  );
  const onTalentHandler = () => {
    if (employeeData) {
      swal({
        title: "You have already employee loggedin",
        text: "please logout",
      });
    } else {
      if (userData) {
        swal({
          title: "You have already user loggedin",
          text: "please logout",
        });
      } else {
        router.push("/hire-talent");
      }
    }
  };
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
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
          <button
            onClick={onTalentHandler}
            className="second-bg-color third-text-color border-2 main-border-color rounded-md px-6 py-2 text-lg font-semibold cursor-pointer "
          >
            HIRE TALENT
          </button>
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
