import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Banner = () => {
    return (
        <section className="bg-secondary-color py-12 lg:py-20 ">
            {/* Background Image - Bottom Right */}
            {/* <div className="absolute bottom-0 right-0 h-full w-full">
                <Image
                    src="/bg-image.jpg" 
                    alt="Background pattern"
                    fill
                    className="object-cover"
                    priority
                />
            </div> */}

            {/* Content Container */}
            <div className="max-w-[1440px] mx-auto w-11/12 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Text Content */}
                <div className="text-center lg:text-left max-w-3xl text-third-color">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-wider leading-14" style={{fontFamily: 'var(--font-inter)'}}>
                        Your Reliable Partner in Healthcare Staffing and Workforce Development.
                    </h1>
                    <p className=" text-base lg:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-7">
                        Helping your mission thrive—by putting the right people in the right places.
                        We match meaningful work with world-class talent.Simple as that.
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">
                        <button className="bg-primary-color hover:border-secondary-color hover:bg-transparent text-primary-color font-semibold px-8 py-3 rounded transition-colors duration-300 text-lg lg:text-2xl cursor-pointer">
                            HIRE TALENT
                        </button>
                        <Link
                            href="#"
                            className="border-2 border-white hover:border-[#63e6b8] px-8 py-3 rounded hover:bg-[#63e6b8] hover:text-[#002454] font-semibold transition-colors duration-300 flex items-center text-lg lg:text-2xl cursor-pointer"
                        >
                            SEARCH JOBS <span className="ml-1 text-sm"><FaExternalLinkAlt /></span>
                        </Link>
                    </div>
                </div>
                {/* Awards */}
                <div className="flex justify-center gap-6 flex-wrap relative z-10">
                    <Image
                        src="/compressed_successful-medical-team.jpg"
                        alt="Staffing Awards"
                        width={690}
                        height={690}
                        className="w-full max-w-[690px] h-auto rounded-2xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;