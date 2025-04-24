import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Banner = () => {
    return (
        <section className="second-bg-color py-12 lg:py-20 ">
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
                <div className="text-center lg:text-left max-w-[800px] third-text-color">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-wider leading-14 uppercase" style={{fontFamily: 'var(--font-inter)'}}>
                        Your Reliable Partner in Healthcare Staffing and Workforce Development.
                    </h1>
                    <p className=" text-base lg:text-lg mb-8   lg:mx-0 leading-7">
                        Helping your mission thrive—by putting the right people in the right places.
                        We match meaningful work with world-class talent.Simple as that.
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">

                        <button className="purple-color-btn main-bg-color border-2 purple-color-border  rounded-md px-6 py-2 text-lg font-semibold cursor-pointer hover:bg-transparent hover:third-text-color ">

                            HIRE TALENT
                        </button>
                        <Link
                            href="#"
                            className="third-text-color border-2 white-border-color  rounded-md px-6 py-2 text-lg font-semibold cursor-pointer flex items-center gap-1"
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