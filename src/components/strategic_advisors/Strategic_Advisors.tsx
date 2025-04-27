import { FaUserMd, FaUserTie } from "react-icons/fa";
import CtaBtn from "../ui/ctaBtn/CtaBtn";
import Title from "../title/Title";
const Strategic_Advisors = () => {
  return (

    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-[1440px] mx-auto w-11/12 flex flex-col items-center text-center ">
      <Title heading="Strategic Advisors" paragraph="We&apos;re proud to be guided by trusted advisors whose decades of
          expertise shape our strategy and vision."/>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Advisor 1 */}
          <div className="p-6 lg:p-10 rounded-xl soft-bg-purple border-2 main-border-color transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="mb-4">
              <FaUserMd className="main-text-color text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-color text-left mb-4">
            Dr Aboo Nasar
            </h3>

            <p className="second-text-color text-left ">
              A respected name in healthcare education and clinical training,
              Dr. Nasar brings over 30 years of experience in clinical
              operations, academic leadership, and workforce development. His
              mentorship helps ensure our staffs are not just placed—they&apos;re
              prepared to thrive.
            </p>
          </div>

          {/* Advisor 2 */}
          <div className="p-6 lg:p-10 rounded-xl soft-bg-purple border-2 main-border-color transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="mb-4">
              <FaUserTie className="main-text-color text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-color text-left mb-4">
            (Advisor Name Pending)
            </h3>
            <p className="second-text-color text-left ">
            With a strong background in healthcare policy and systems improvement, our second
              advisor contributes critical insight that helps us stay agile and forward-thinking in an
              evolving healthcare landscape.
            </p>
          </div>
        </div>
        {/* <div className=" mt-5 flex justify-center items-center">
          <CtaBtn />
        </div> */}
      </div>
    </section>
  );
};

export default Strategic_Advisors;
