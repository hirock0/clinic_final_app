'use client'
import Title from "@/components/title/Title";
import Image from "next/image";
import { useState } from "react";
const Strategic_Advisors = () => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const strategicAdvisors = [
    {
      name: "Roy Rodriguez",
      title: "STRATEGIC ADVISOR -I",
      photo: "/team/roy.jpg",
      bio: "Brings unmatched expertise in healthcare business, backed by 30+ years of experience driving growth and operational excellence."
    },
    {
      name: "Dr. Abu Nasar",
      title: "STRATEGIC ADVISOR -II",
      photo: "/team/Picture-04.jpg",
      bio: "With over 30 years of healthcare experience, guides our growth with expert insight, integrity, and a focus on quality care."
    }

  ]

  const handleActiveCard = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  }


  return (

    <section className="py-12 md:py-20">
      <div className=" max-w-[1440px] mx-auto w-11/12 flex items-center flex-col-reverse lg:flex-row justify-between gap-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full lg:w-1/2">
          {strategicAdvisors.map((member, index) => (
            <div key={index}
              onClick={() => handleActiveCard(index)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group">
              <div className="relative aspect-square">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover items-start justify-start"
                />
              </div>
              <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#ffdb61] to-transparent transition-transform group-hover:translate-y-0  duration-300 ease-in-out
                ${activeIndex === index ? 'translate-y-0' : 'translate-y-full'}
                `}>
                <h3 className="text-lg font-semibold second-text-color text-shadow-[#1e1e1e] text-shadow-xs">{member.name}</h3>
                <p className="second-text-color font-medium test-sm">{member.title}</p>
                <p className="mt-2 text-gray-700 text-xs">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-start text-start lg:items-end lg:text-end lg:max-w-xl lg:w-1/2">
          <Title heading="Strategic Advisors" paragraph="We&apos;re proud to be guided by trusted advisors whose decades of
          expertise shape our strategy and vision."/>
        </div>

      </div>
    </section>
  );
};

export default Strategic_Advisors;
