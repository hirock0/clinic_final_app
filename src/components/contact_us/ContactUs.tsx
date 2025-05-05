import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactBtn from "../ui/btns/contactBtn/ContactBtn";

const ContactUs = () => {
  return (
    <section className="relative py-10 md:py-14 lg:py-20 w-full  second-bg-color">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/CTA-Full-Width-Texture.png" // Replace with your image path
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
            className="text-3xl sm:text-4xl font-black mb-4 uppercase"
            style={{ fontFamily: "var(--font-inter" }}
          >
            Work with a staffing partner focused on healthcare and clinical
            support excellence
          </h2>
          <p
            className="text-lg mb-8 text-center"
            style={{ fontFamily: "var(--font-inter" }}
          >
            Connect with UCL to get the expertise and resources you need to
            succeed.
          </p>

          <div className="inline-flex flex-col justify-center">
            <ContactBtn design={"third-text-color hover:bg-blue-600 hover:border-blue-600 border-2 white-border-color uppercase  rounded-md px-6 py-2 text-lg font-semibold cursor-pointer flex items-center gap-1"}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
