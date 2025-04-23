"use client";
import {
  FaUsers,
  FaHandsHelping,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUsers />,
    title: "Local Insight, Statewide Reach",
    description:
      "We live and breathe California healthcare regulations, licensing quirks, regional talent pools. That insider knowledge means faster placements with zero compliance headaches.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Speed & Personal Service",
    description:
      "Talk to a real human who understands your urgency. Most roles are presented within 24–48 hours, and you’ll never wonder where things stand.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Quality Over Quantity",
    description:
      "We hand-screen every candidate, so you see a short list of perfect fits—not a flood of random résumés.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Ethics-First Reliability",
    description:
      "Transparent pricing, honest timelines, and a commitment to patient safety guide every placement we make.",
  },
];

export default function WhyChooseSBT() {
  return (
    <section className="text-center bg-base-100 py-16 ">
      <div className="max-w-[1440px] mx-auto w-11/12">
        <h2 className="text-4xl font-bold mb-10 text-primary" style={{fontFamily:"var(--font-inter)"}}>
          Why Choose SBT
        </h2>
        <div className="grid grid-cols-4 max-[1400px]:grid-cols-2 max-md:grid-cols-1 gap-6">
          {features?.map((feature, idx) => (
            <div key={idx} className="card bg-base-200 shadow-xl p-6">
              <div className="flex justify-center mb-4">
                <div className=" bg-slate-400 shadow-2xl text-third-color text-5xl p-4 rounded-full">
                  {feature?.icon}
                </div>
              </div>
              <h3
                className="font-semibold text-primary-color text-3xl max-sm:text-2xl mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {feature?.title}
              </h3>
              <p className=" text-secondary-color sm:text-xl ">{feature?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
