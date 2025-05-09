import Image from "next/image";
import React from "react";
import Search_Jobs from "@/components/ui/btns/ctaBtn/search_jobs/Search_Jobs";
const Opportunity = () => {
  return (
    <section className="relative py-12 lg:py-20 max-w-[1440px] mx-auto w-11/12 second-bg-color rounded-2xl mb-12 md:mb-20">
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
        <div className="absolute inset-0 bg-black/5 rounded-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 sm:px-8">
        <div className=" text-center third-text-color">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 uppercase" style={{fontFamily: 'var(--font-inter'}}>
            Looking for Your Next Job Opportunity?
          </h2>
          <p className="text-lg mb-8 max-w-3xl " style={{ fontFamily: 'var(--font-inter' }}>
            Match your unique skills with in-demand jobs at growing
            organizations — and positively impact your life — by working with a
            trusted career partner.
          </p>
          <div className="inline-flex flex-col justify-center">
            <Search_Jobs/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunity;
