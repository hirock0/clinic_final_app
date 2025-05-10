import Image from "next/image";
const Faqs = () => {
  return (
    <div className=" py-12 lg:py-20 max-w-[1440px] mx-auto w-11/12 gap-6 flex items-center lg:flex-row flex-col">
      <div className="w-full h-full">
        <Image src={"https://cdn.pixabay.com/photo/2024/10/07/13/00/unknown-9102980_960_720.jpg"} alt="poster" width={500} height={500}
        className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4 w-full second-text-color">
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
          1. What types of healthcare professionals do you staff?
          </div>
          <div className="collapse-content">
            <p>
            We staff a wide range of roles including RNs, LVNs, CNAs, medical assistants, therapists, phlebotomists, lab techs, and admin support. Basically, if it keeps a clinic or hospital running, we got you.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
          2. How fast can you fill an open position?
          </div>
          <div className="collapse-content">
            <p>
            Most roles are matched within 24–48 hours. Our insider knowledge of local talent pools and licensing rules helps us move fast without cutting corners.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
          3. Are your candidates vetted and licensed?

          </div>
          <div className="collapse-content">
            <p>
            Absolutely. Every professional goes through a full background check, license verification, and skills screening before we even consider sending them your way.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
          4. Do you offer temp, temp-to-hire, or permanent placements?
          </div>
          <div className="collapse-content">
            <p>
            Yes to all three. We&apos;re flexible - whether you need short-term coverage or you&apos;re building out a dream team, we&apos;ll tailor it to your needs.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
          5. What makes your agency different from others?

          </div>
          <div className="collapse-content">
            <p>
            We&apos;re local experts with a statewide reach. We blend speed, personal service, and a quality-over-quantity approach so you&apos;re not drowning in résumés — just getting the right ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
