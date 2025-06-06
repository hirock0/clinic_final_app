import Image from "next/image";
import React from "react";
import ContactBtn from "../../ui/btns/contactBtn/ContactBtn";

const ContactUs = () => {
  return (
    <section className="relative py-10 md:py-14 lg:py-20 w-full  second-bg-color">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/CTA-Full-Width-Texture.png" 
          alt="Job opportunity background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 sm:px-8">
        <div className="max-w-5xl mx-auto text-white">
          <h2
            className="text-2xl md:text-4xl  font-black mb-3 lg:mb-6 uppercase"
            style={{ fontFamily: "var(--font-inter" }}
          >
            Work with a staffing partner focused on healthcare and clinical
            support excellence
          </h2>
          <p
            className="text-base lg:text-lg mb-6 lg:mb-8 text-center"
            style={{ fontFamily: "var(--font-inter" }}
          >
            Connect with UCL to get the expertise and resources you need to
            succeed.
          </p>

          <div className="inline-flex flex-col justify-center">
            <ContactBtn design={"text-base lg:text-lg font-semibold py-1.5 px-2.5 md:py-2 md:px-4 border-2 rounded-md hover:bg-[#fafafa] hover:text-[#0a0a0a] border-[#fafafa] bg-transparent text-[#fafafa] transition-colors duration-300 ease-in-out cursor-pointer uppercase"}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
