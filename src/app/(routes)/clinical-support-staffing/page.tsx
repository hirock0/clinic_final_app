import Title from '@/components/title/Title';
import Link from 'next/link';
import React from 'react';

const ClinicalSupportStaffingPage = () => {
    return (
        <section className='scroll-mt-40 max-w-[1440px] mx-auto w-11/12 py-12 md:py-20'>
            <div className='mb-10 flex flex-col items-center justify-center text-center lg:max-w-4xl mx-auto'>
                <Title heading='Strength Behind the Scenes of Every Great Care Team' paragraph='In the fast-paced world of healthcare, clinical support staff are the unsung heroes — the ones ensuring that patient care runs smoothly, efficiently, and with heart. At [Your Agency Name], we specialize in providing skilled clinical support professionals who are ready to step in and make an immediate impact.' />
            </div>

            {/* content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {/* section 1 */}
                <div className="space-y-4 bg-white rounded-2xl shadow p-10">
                    <h3 className='text-xl font-bold'>What Is Clinical Support Staffing?</h3>
                    <p className='text-sm text-gray-500'>Clinical support staff are the backbone of any healthcare operation. They may not be performing surgeries, but they’re making sure every test, treatment, and appointment happens seamlessly. These roles include:</p>
                    <ul className='list-disc ml-5 text-sm text-gray-500 space-y-2'>
                        <li>
                            Medical Assistants (MAs)
                        </li>
                        <li>

                            Certified Nursing Assistants (CNAs)
                        </li>
                        <li>
                            Licensed Vocational Nurses (LVNs) / Licensed Practical Nurses (LPNs)
                        </li>
                        <li>
                            Phlebotomists
                        </li>
                        <li>
                            Lab Technicians
                        </li>
                        <li>
                            Patient Care Technicians
                        </li>
                        <li>
                            Radiology and Imaging Techs
                        </li>
                        <li>
                            Respiratory Therapists
                        </li>
                        <li>
                            Telemetry Techs
                        </li>
                        <li>
                            Sterile Processing Techs
                        </li>
                        <li>
                            EKG Technicians
                        </li>

                    </ul>
                </div>

                {/* section 2 */}
                <div className="space-y-4 bg-white rounded-2xl shadow p-10">
                    <h3 className='text-xl font-bold'>Who We Serve</h3>
                    <p className='text-sm text-gray-500'>We provide clinical support staffing for:</p>
                    <ul className='list-disc ml-5 text-sm text-gray-500 space-y-2'>
                        <li>
                            Hospitals & Emergency Departments
                        </li>
                        <li>
                            Urgent Care Clinics
                        </li>
                        <li>
                            Long-Term Care Facilities & Rehab Centers


                        </li>
                        <li>
                            Specialty Clinics (Cardiology, Oncology, etc.)

                        </li>
                        <li>
                            Primary Care & Family Practices

                        </li>
                        <li>
                            Surgery Centers

                        </li>
                        <li>
                            Home Health Agencies
                        </li>
                    </ul>
                </div>

                {/* section 3 */}
                <div className="space-y-4 bg-white rounded-2xl shadow p-10">
                    <h3 className='text-xl font-bold'>Flexible, Fast, and Focused</h3>
                    <p className='text-sm text-gray-500'>Whether you&apos;re facing a sudden staff shortage, preparing for seasonal patient spikes, or simply want to strengthen your team, we offer:</p>
                    <ul className='list-disc ml-5 text-sm text-gray-500 space-y-2'>
                        <li>
                            Per diem shifts
                        </li>
                        <li>
                            Short-term and long-term contracts

                        </li>
                        <li>
                            Temp-to-hire options

                        </li>
                        <li>
                            24/7 staffing support

                        </li>
                    </ul>
                </div>

            </div>


            <div className="mt-10 flex flex-col items-center justify-center">
                <h4 className='text-xl text-center mb-2 font-bold'>Let Us Power Your Clinical Team</h4>
                <p className="text-sm font-medium mb-4 max-w-3xl text-center text-gray-500">Your patients deserve the best — and that starts with having the right support staff in place. Let us help you build a team that’s dependable, skilled, and compassionate.</p>
                <div className="space-x-4">
                    <Link href="/conatct">
                        <button className="bg-[#ffdb61] px-5 py-2 rounded hover:bg-[#ffdb61]/80 text-[#171717] cursor-pointer">Schedule a Call</button>
                    </Link>
                    <Link href="tel:5104029388">
                        <button className="border border-[#308d89] text-[#308d89] px-5 py-2 rounded hover:bg-[#f3fffe] cursor-pointer">Contact Us Today</button>
                    </Link>
                    <Link href="/hire-talent">
                        <button className="bg-[#171717] text-white px-5 py-2 rounded hover:bg-gray-800 cursor-pointer">Request Staff</button>
                    </Link>
                </div>
            </div>



        </section>
    );
};

export default ClinicalSupportStaffingPage;