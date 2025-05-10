import Title from '@/components/title/Title';
import Link from 'next/link';
import React from 'react';

const HelpCenterPage = () => {
    return (
        <section className="scroll-mt-40 max-w-[1440px] mx-auto w-11/12 py-12 md:py-20">
            {/* <!-- Header --> */}
            <div className="text-center mb-12">
                <Title heading='HELP CENTER' paragraph="We've Got Your Back – Every Step of the Way."/>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/*  Section 1: Getting Started */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-xl font-semibold main-text-color mb-4">1. Getting Started</h3>

                    <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2">How to Apply</h4>
                        <p className="text-gray-500 mb-3">
                            You can apply directly through our <a href="/jobs" className="main-text-color hover:underline">Jobs Page</a>.
                            Just select a role that fits your skills, fill out the application form, upload your resume,
                            and fill out your availability. Applications take less than 5 minutes!
                        </p>
                        <div className="soft-bg-purple p-3 rounded">
                            <p className="main-text-color font-medium">Pro Tip:</p>
                            <p className="main-text-color">Make sure your certifications and experience match the role you're applying for. That's how you get that callback fast.</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2">Once you are selected for the job, what Documents You Need</h4>
                        <p className="text-gray-500 mb-2">Here's the usual checklist:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-500">
                            <li>Government-issued photo ID</li>
                            <li>Social Security card (for payroll setup)</li>
                            <li>TB test results</li>
                            <li>CPR certification</li>
                            <li>Relevant licenses (e.g., CNA, HHA)</li>
                        </ul>
                        <p className="text-gray-500 mt-2">If you're missing anything, no worries — we'll guide you on how to get it done quickly.</p>
                    </div>
                </div>

                {/* Section 2: Resume & Interview Support */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-xl font-semibold main-text-color mb-4">2. Resume & Interview Support</h3>

                    <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2 ">Resume Tips for Clinical Roles</h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-500">
                            <li>Keep it 1 page.</li>
                            <li>Use bullet points for past jobs.</li>
                            <li>Highlight: certifications, years of experience, special skills (e.g., bilingual, wound care).</li>
                        </ul>
                        <div className="bg-gray-100 p-3 rounded mt-3">
                            <p className="font-medium">Example:</p>
                            <p className="font-semibold">Home Health Aide | 2023–2024</p>
                            <ul className="list-disc pl-5">
                                <li>Provided daily ADL support to elderly patients</li>
                                <li>Trained in safe transfers and mobility assistance</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2 ">Common Interview Questions & How to Answer Them</h4>
                        <div className="space-y-3">
                            <p className="font-medium text-gray-500">"Why do you want to work in caregiving?"</p>
                            <p className="text-gray-500">Show your heart. Talk about compassion and making a difference.</p>

                            <p className="font-medium mt-3 text-gray-500">"What would you do if a patient refuses care?"</p>
                            <p className="text-gray-500">Stay calm, respect their autonomy, report to a supervisor if needed.</p>
                        </div>
                    </div>
                </div>

                {/*  Section 3: Role-Specific Info  */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-xl font-semibold main-text-color mb-4">3. Role-Specific Info</h3>

                    <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2">CNA vs. Caregiver: What's the Difference?</h4>
                        <div className="space-y-2">
                            <p className="font-medium">CNA (Certified Nursing Assistant):</p>
                            <p className="text-gray-500">Requires state certification. Works in hospitals or nursing homes. Can do vital signs, medical charting.</p>

                            <p className="font-medium ">Caregiver (Home Aide/Companion):</p>
                            <p className="text-gray-500">No license required in most states. Focuses on daily living: bathing, meal prep, companionship.</p>
                        </div>
                        <p className="text-gray-500 mt-2">CNA = more clinical; Caregiver = more personal care.</p>
                    </div>

                </div>

  

            </div>

            {/*  CTA Section  */}
            <div className="text-center mt-12 bg-[#fffaea] p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Can't Find What You Need?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Book a one-on-one call with our Job Seeker Success Coach.
                    We'll walk you through your options, answer questions, and help get you hired fast.
                </p>
                <Link href="/contact" className="inline-block bg-[#ffdb61] hover:opacity-90 font-semibold px-6 py-3 rounded-lg transition-colors">
                    Book My Session
                </Link>
            </div>
        </section>
    );
};

export default HelpCenterPage;