import Image from 'next/image';
import React from 'react';
import Title from '../title/Title';

const LeadershipTeam = () => {

    const teamMembers = [
        {
            name: "John Smith",
            title: "CEO & Founder",
            photo: "/team/Profile Picture-02.jpg", // Replace with your image paths
            bio: "Healthcare industry veteran with 15+ years of experience building patient-first organizations."
        },
        {
            name: "Sarah Johnson",
            title: "Chief Operations Officer",
            photo: "/team/Profile Picture-04.jpg",
            bio: "Specializes in operational efficiency and staff development for healthcare providers."
        },
        {
            name: "Michael Chen",
            title: "Chief Technology Officer",
            photo: "/team/Profile Picture-06.jpg",
            bio: "Technology innovator focused on modernizing healthcare staffing solutions."
        },
        {
            name: "Emily Wilson",
            title: "Chief Medical Officer",
            photo: "/team/Profile Picture-02.jpg",
            bio: "Board-certified physician leading clinical quality and compliance initiatives."
        }
    ];



    return (
        <section className="pb-12 lg:pb-20 bg-gray-50">
            <div className="max-w-[1440px] mx-auto w-11/12">

                <Title heading='Our Leadership Team' paragraph='The experienced professionals guiding our mission' />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group">
                            <div className="aspect-w-3 aspect-h-3 relative">
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-[500px] lg:h-[400px]"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                                <h3 className="text-xl font-semibold text-white text-shadow-[#ffdb61] text-shadow-2xs">{member.name}</h3>
                                <p className="accent-text-color font-medium">{member.title}</p>
                                <p className="mt-3 text-gray-200">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipTeam;