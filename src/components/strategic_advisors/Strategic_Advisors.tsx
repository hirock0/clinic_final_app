import { FaUserMd, FaUserTie } from "react-icons/fa";

import CtaBtn from "../ui/ctaBtn/CtaBtn";
const Strategic_Advisors = () => {
  return (
    <div>
      <section className="py-16 bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className=" max-w-[1440px] mx-auto w-11/12 ">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Strategic Advisors
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            We’re proud to be guided by trusted advisors whose decades of
            expertise shape our strategy and vision:
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Advisor 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <FaUserMd className="text-blue-600 text-3xl" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Dr. Aboo Naser
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                A respected name in healthcare education and clinical training,
                Dr. Naser brings over 30 years of experience in clinical
                operations, academic leadership, and workforce development. His
                mentorship helps ensure our staffs are not just placed—they’re
                prepared to thrive.
              </p>
            </div>

            {/* Advisor 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <FaUserTie className="text-green-600 text-3xl" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  (Advisor Name Pending)
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                With a strong background in healthcare policy and systems
                improvement, our second advisor contributes critical insight
                that helps us stay agile and forward-thinking in an evolving
                healthcare landscape.
              </p>
            </div>


          </div>
          <div className=" mt-5 flex justify-center items-center">
                <CtaBtn/>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Strategic_Advisors;
