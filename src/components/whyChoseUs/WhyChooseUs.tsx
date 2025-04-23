"use client";
import {
  FaUsers,
  FaHandsHelping,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import Title from "../title/Title";

const features = [
  {
    icon: <FaUsers />,
    title: "Expertise Rooted in California, Service Spanning the State",
    description:
      "Our deep understanding of California’s healthcare landscape—from regulatory requirements to regional licensing nuances and talent availability—enables us to deliver faster placements without the burden of compliance concerns.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Urgency Met with Expertise",
    description: "Connect directly with a dedicated staffing professional who understands the urgency of your needs. Most roles are filled within 24–48 hours, and we ensure consistent communication every step of the way—so you're never left in the dark.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Smart Screening Stronger Teams",
    description:
      "Transparent pricing, honest timelines, and a commitment to patient safety guide every placement we make.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Where Ethics Meet Efficiency",
    description:
      "Every placement is grounded in transparency, integrity, and a steadfast commitment to patient safety—with clear pricing and honest timelines from the start.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="text-center bg-base-100 py-12 md:py-20 ">
      <div className="max-w-[1440px] mx-auto w-11/12">
        <Title heading="WHY CHOOSE UNITED CARE LINKS" paragraph="United Care Links is a California-based healthcare staffing squad that&apos;s all about one thing: making sure your care team is stacked with reliable, compassionate pros.
From 24/7 nurses to niche therapists and group facilitators, we&apos;ve got your back—filling in every gap so you can keep your eyes on what matters most: your patients.
"/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features?.map((feature, idx) => (
            <div key={idx} className="card soft-bg-purple p-6 transition-transform hover:scale-105 duration-300 ease-in-out border-2 main-border-color">
              <div className="flex justify-start mb-4">
                <div className=" main-bg-color shadow main-text-color text-4xl p-4 rounded-full">
                  {feature?.icon}
                </div>
              </div>
              <h3
                className="font-bold uppercase  text-base max-sm:text-2xl mb-4 text-left"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {feature?.title}
              </h3>
              <p className="sm:text-xs text-left">{feature?.description}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
