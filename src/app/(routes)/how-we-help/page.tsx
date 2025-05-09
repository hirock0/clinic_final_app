import Link from 'next/link';
import { title } from 'process';
import React from 'react';
import { FaBusinessTime, FaHandHoldingHeart, FaPuzzlePiece, FaShieldAlt, FaUserCheck, FaHandshake, FaChartLine, FaAward, FaPeace, FaStar } from 'react-icons/fa';
import { FaCalendarCheck, FaHouseChimneyMedical, FaUserDoctor } from "react-icons/fa6";

const HowWeCanHelpPage = () => {

    const healthcareOrg = [
        {
            icon: FaUserDoctor,
            title: 'Qualified Professionals on Demand',
            paragraph: 'From CNAs and HHAs to medical assistants and companions — we provide staff for hospitals, clinics, assisted living facilities, and home health providers.'
        },
        {
            icon: FaHandshake,
            title: 'Custom Matchmaking',
            paragraph: 'Need bilingual staff? Hospice-trained aides? Weekend or overnight coverage? We find the perfect fit for your needs.'
        },
        {
            icon: FaChartLine,
            title: 'Time & Cost Savings',
            paragraph: 'Skip the stress of recruiting. We handle everything — vetting, background checks, and training — so you can focus on care.'
        },
        {
            icon: FaAward,
            title: 'Quality You Can Count On',
            paragraph: 'All our staff are licensed, certified, and trained to meet the highest standards of care — with a heart for service.'
        }
    ]

    const individuals = [
        {
            icon: FaHouseChimneyMedical,
            title: 'In-Home Support',
            paragraph: 'Help with daily tasks, mobility, bathing, medication reminders, companionship, and more — all from the comfort of home.'
        },
        {
            icon: FaCalendarCheck,
            title: 'Flexible Care Plans',
            paragraph: 'Whether you need short-term, long-term, live-in, or hourly care — we’ll build a schedule that works for your lifestyle.'
        },
        {
            icon: FaPeace,
            title: 'Family Peace of Mind',
            paragraph: 'We keep families informed and involved, providing regular updates and support along the way.'
        },
        {
            icon: FaStar,
            title: 'Concierge-Level Service',
            paragraph: 'Our caregivers do more than just assist — they go above and beyond. Cooking favorite meals, walking pets, running errands, and creating real connections.'
        }
    ]


    const chooseUs = [
        {
            icon: FaBusinessTime,
            title: '24/7 Availability',
        },
        {
            icon: FaUserCheck,
            title: 'Fully Screened, Vetted Staff',
        },
        {
            icon: FaShieldAlt,
            title: 'Licensed & Insured',
        },
        {
            icon: FaHandHoldingHeart,
            title: 'Compassion-First Approach',
        },
        {
            icon: FaPuzzlePiece,
            title: 'Tailored Support for Every Client',
        }
    ]


    return (
        <section className=' scroll-mt-40 max-w-[1440px] mx-auto w-11/12'>
            {/* <div className="text-center py-10 bg-[#f9fafb]">
                <h1 className="text-3xl font-bold uppercase">How We Can Help Supporting Organizations. Empowering Individuals.</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Supporting Organizations. Empowering Individuals.
                </p>
            </div> */}

            <div className="max-w-4xl mx-auto text-center pt-12">
            <h1 className="text-3xl font-bold uppercase mb-4">How We Can Help Supporting Organizations, Empowering Individuals.</h1>
                <p className="text-lg text-gray-600">
                    At <strong>United Care Links</strong>, we specialize in healthcare staffing and caregiver support — connecting experienced, compassionate professionals with those who need them most. Whether you're a facility or a family — we're here to make life easier.
                </p>
            </div>

            <div className="pt-12">
                <h2 className="text-xl font-bold text-center mb-6 uppercase">For Healthcare Organizations</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-6 place-content-center">
                    {/* Repeatable Card */}
                    {healthcareOrg.map((card, index) => (
                        <div key={index} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">
                            <card.icon size={40} className='mb-4 text-[#308d89]' />
                            <h3 className="font-semibold text-base mb-2 ">{card.title}</h3>
                            <p className='text-sm text-gray-500'>{card.paragraph}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-12">
                <h2 className="text-xl font-bold text-center mb-6 uppercase">For Individuals & Families</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-6 place-content-center">
                    {/* Repeatable Card */}
                    {individuals.map((card, index) => (
                        <div key={index} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">
                            <card.icon size={40} className='mb-4 text-[#308d89]' />
                            <h3 className="font-semibold text-base mb-2 ">{card.title}</h3>
                            <p className='text-sm text-gray-500'>{card.paragraph}</p>
                        </div>
                    ))}
                </div>
            </div>



            <div className="pt-12 text-center">
                <h2 className="text-2xl font-bold mb-4 uppercase">Why Choose Us?</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {chooseUs.map((card, index) => (
                        <div key={index} className="bg-[#f3fffe] border border-[#308d89] rounded-2xl flex flex-col items-center justify-center space-y-4 p-6">
                            {/* icon */}
                            <card.icon size={40} className="text-[#308d89]" />
                            <p className='text-sm text-gray-500'>{card.title}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="py-10 text-center">
                <p className="text-lg font-medium mb-4">Let&apos;s connect.</p>
                <div className="space-x-4">
                    <Link href="tel:5104029388">
                        <button className="bg-[#ffdb61] px-5 py-2 rounded hover:bg-[#ffdb61]/80 text-[#171717] cursor-pointer">Call Us</button>
                    </Link>
                    <Link href="/">
                        <button className="border border-[#308d89] text-[#308d89] px-5 py-2 rounded hover:bg-[#f3fffe] cursor-pointer">Get a Free Consultation</button>
                    </Link>
                    <Link href="/">
                        <button className="bg-[#171717] text-white px-5 py-2 rounded hover:bg-gray-800 cursor-pointer">Request Care</button>
                    </Link>
                </div>
            </div>

        </section>
    );
};

export default HowWeCanHelpPage;