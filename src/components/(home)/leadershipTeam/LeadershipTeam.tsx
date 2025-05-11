'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Title from '@/components/title/Title';



const LeadershipTeam = () => {


    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const teamMembers = [
        {
            name: "Imtiaz Kasem",
            title: "Chief Executive Officer",
            photo: "/team/Picture-02.jpg",
            bio: "Blending 27+ years of business and medical insight to lead in healthcare innovation."
        },
        {
            name: "Kirsten Chazaud",
            title: "Director of Business Development",
            photo: "/team/Picture-06.jpg",
            bio: "Strategic leader in senior care, driving innovation and compassionate solutions."
        },
    ];


    const handleActiveCard = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index))
    }

    return (
        <section className="pb-12 lg:pb-20 bg-gray-50">
            <div className="max-w-[1440px] mx-auto w-11/12 flex items-center flex-col lg:flex-row justify-between gap-8">

                <div className="w-full flex flex-col items-start text-start lg:max-w-xl lg:w-1/2">
                    <Title heading='Our Leadership Team' paragraph='We&apos;re proud to be guided by trusted advisors whose decades of expertise shape our strategy and vision.' />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full lg:w-1/2">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            onClick={() => handleActiveCard(index)}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group">
                            <div className="relative aspect-square">
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    fill  
                                    className="object-cover items-start"
                                />
                            </div>
                            <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#ffdb61] to-transparent
                            transition-transform duration-300 ease-in-out ${activeIndex === index ? 'translate-y-0' : 'translate-y-full'} 
                            group-hover:translate-y-0
                                `}>
                                <h3 className="text-xl font-semibold second-text-color text-shadow-[#1e1e1e] text-shadow-xs">{member.name}</h3>
                                <p className="second-text-color font-medium">{member.title}</p>
                                <p className="mt-3 text-gray-700">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipTeam;