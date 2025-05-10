import Title from '@/components/title/Title';
import { div } from 'framer-motion/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const WhyUnitedCareLinksPage = () => {
    const features = [
        {
            title: 'Tailored Staffing Solutions',
            description: 'United Care Links specializes in providing customized staffing solutions for healthcare facilities. Whether it\'s temporary, permanent, or per diem positions, we align our services to meet the specific needs of each client.'
        },
        {
            title: 'Diverse Talent Pool',
            description: 'We boast a broad network of qualified healthcare professionals, ensuring that facilities are matched with candidates who not only meet the required qualifications but also fit seamlessly into the organizational culture.'
        },
        {
            title: 'Rigorous Screening Process',
            description: 'To maintain high standards, United Care Links implements a thorough vetting process. This includes credential verification, background checks, and skill assessments, ensuring that only top-tier professionals are placed.'
        },
        {
            title: 'Client-Centric Approach',
            description: 'Our commitment to client satisfaction is evident through personalized service and responsive communication. They work closely with clients to understand their unique challenges and provide staffing solutions that drive success.'
        },
        {
            title: 'Positive Reputation',
            description: 'Feedback from healthcare facilities highlights United Care Links\' reliability and professionalism. Our consistent delivery of quality staffing solutions has earned us a reputable standing in the industry.'
        }
    ];

    return (
        <section className="scroll-mt-40 py-12 md:py-20">
            <div className="max-w-[1440px] mx-auto w-11/12">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <Title heading='WHY UNITED CARE LINKS?' paragraph="If you're eyeing United Care Links as your go-to clinical staffing agency, here's why we might just be your perfect match."/>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    {/* Image Section - Replace with your actual image */}
                    <div className="lg:w-1/2">
                            <Image
                                src="/nurse-old-man.jpg" 
                                alt="United Care Links team"
                                height={700}
                                width={500}
                                className=" h-auto w-full rounded-lg overflow-hidden shadow-xl"
                            />
                    </div>

                    {/* Features List */}
                    <div className="lg:w-1/2 space-y-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-md accent-bg-color second-text-color">
                                        <span className="font-bold">{index + 1}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Closing CTA */}
                <div className="max-w-3xl mx-auto text-center mt-16">
                    <p className="text-lg text-gray-500 mb-6">
                        If you're seeking a staffing partner that prioritizes quality, reliability, and personalized service, United Care Links stands out as a compelling choice.
                    </p>
                    <Link href='/contact' className="accent-bg-color second-text-color font-semibold py-3 px-8 rounded-lg transition-colors duration-300 hover:opacity-90">
                        Contact Us Today
                    </Link>
                </div>
            </div>
        </section>
    )
};


export default WhyUnitedCareLinksPage;