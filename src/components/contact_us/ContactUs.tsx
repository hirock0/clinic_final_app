import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactUs = () => {
  return (
    <section className="relative py-10 md:py-14 lg:py-20 w-full bg-[#002454]">
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
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
            Work with a Trusted Healthcare and Life Sciences Staffing Partner
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10">
            Connect with Medix to get the expertise and resources you need to
            succeed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#"
              className="border-2 hover:border-white border-[#63e6b8] px-8 py-3 rounded bg-[#63e6b8] text-[#002454] hover:bg-white font-semibold transition-colors duration-300 flex items-center text-lg lg:text-2xl cursor-pointer"
            >
              CONTACT US NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
