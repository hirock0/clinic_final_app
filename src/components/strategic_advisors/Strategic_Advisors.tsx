import { FaUserMd, FaUserTie } from "react-icons/fa";
import CtaBtn from "../ui/ctaBtn/CtaBtn";
const Strategic_Advisors = () => {
  return (

    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-[1440px] mx-auto w-11/12 flex flex-col items-center text-center ">
        <h2 className="text-3xl font-bold mb-4 text-primary-color" style={{ fontFamily: 'var(--font-inter' }}>
          Strategic Advisors
        </h2>
        <p className="text-lg mb-8 max-w-2xl">
          We&apos;re proud to be guided by trusted advisors whose decades of
          expertise shape our strategy and vision.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Advisor 1 */}
          <div className="p-6 lg:p-10 rounded-xl border-2 border-primary-color">
            <div className="flex items-center gap-4 mb-4">
              <FaUserMd className="text-primary-color text-3xl" />
              <h3 className="text-xl font-semibold text-secondary-color">
                Dr. Aboo Naser
              </h3>
            </div>
            <p className="text-secondary-color ">
              A respected name in healthcare education and clinical training,
              Dr. Naser brings over 30 years of experience in clinical
              operations, academic leadership, and workforce development. His
              mentorship helps ensure our staffs are not just placed—they&apos;re
              prepared to thrive.
            </p>
          </div>

          {/* Advisor 2 */}

          <div className="p-6 lg:p-10 rounded-xl border-2 border-primary-color">
            <div className="flex items-center gap-4 mb-4">
              <FaUserTie className="text-primary-color text-3xl" />
              <h3 className="text-xl font-semibold text-secondary-color">
                (Advisor Name Pending)
              </h3>
            </div>
            <p className="text-secondary-color ">
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
