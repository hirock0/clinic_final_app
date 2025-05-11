import React from 'react';
import { FiAlertTriangle, FiCalendar, FiVideo } from 'react-icons/fi';

const PricingExplain = () => {
    return (
        <div className=" py-12 lg:py-20">
            <div className="max-w-4xl mx-auto w-11/12">
                <h2 className="text-3xl font-bold text-center  mb-12">PRICING PLAN EXPLAINED</h2>

                {/* Standard Staffing */}
                <div className="mb-16 p-6 bg-[#ebf8f8] rounded-xl">
                    <div className="flex items-start">
                        <div className="bg-[#dcf3f2] p-3 rounded-lg mr-4">
                            <FiCalendar className="main-text-color text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold  mb-3">What is meant by <span className="main-text-color">"Standard Staffing Unlimited"</span>?</h3>
                            <div className="prose prose-blue text-gray-500">
                                <p className="font-medium">Standard staffing means:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>You give us advance notice (typically 48+ hours)</li>
                                    <li>Normal scheduling process - no rush fees</li>
                                    <li>Predictable, planned staffing needs</li>
                                </ul>
                                <p className="mt-4 font-medium">"Unlimited" means:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Request as many non-urgent shifts as needed</li>
                                    <li>50 shifts or 500 shifts - same included price</li>
                                    <li>No hidden fees or per-shift charges</li>
                                </ul>
                                <div className="mt-4 p-4 bg-white rounded-lg border border-[#dcf3f2]">
                                    <p className="font-semibold main-text-color">Example:</p>
                                    <p>"We need 3 nurses for regular weekday shifts next month at our clinic"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Urgent Staffing */}
                <div className="mb-16 p-6 bg-red-50 rounded-xl">
                    <div className="flex items-start">
                        <div className="bg-red-100 p-3 rounded-lg mr-4">
                            <FiAlertTriangle className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">What are <span className="text-red-600">"Urgent Staffing Requests"</span>?</h3>
                            <div className="prose prose-red text-gray-500">
                                <p>Urgent requests are for last-minute emergencies when you need staff immediately (within 24 hours).</p>
                                <p className="font-medium mt-3">Typical situations:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Sudden call-outs or no-shows</li>
                                    <li>Unexpected patient surges</li>
                                    <li>Immediate coverage needs</li>
                                </ul>
                                <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
                                    <p className="font-semibold text-red-600">Real-World Examples:</p>
                                    <ul className="space-y-2">
                                        <li>"Our night shift RN just called out sick - need coverage tonight!"</li>
                                        <li>"We're suddenly short-staffed for tomorrow's surgery schedule"</li>
                                        <li>"5 patients just arrived in our ER - need another doctor STAT"</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Interviews */}
                <div className="p-6 bg-[#fffaea] rounded-xl">
                    <div className="flex items-start">
                        <div className="bg-[#fff6d7] p-3 rounded-lg mr-4">
                            <FiVideo className="accent-text-color text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">How does <span className="accent-text-color">Video Interview Access</span> work?</h3>
                            <div className="prose prose-green text-gray-500">
                                <p>Our pre-screened candidates submit short video profiles so you can evaluate them faster than traditional resumes.</p>

                                <div className="mt-6 grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="font-medium mb-2">Our Process:</p>
                                        <ol className="list-decimal pl-5 space-y-2">
                                            <li>We pre-interview candidates with key questions</li>
                                            <li>They record 2-3 minute video introductions</li>
                                            <li>Videos are uploaded to your secure portal</li>
                                        </ol>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-2">You Benefit By:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Seeing personality and communication skills</li>
                                            <li>Reducing time-to-hire by up to 50%</li>
                                            <li>Making more informed staffing decisions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-white rounded-lg border border-[#fff6d7]">
                                    <p className="font-semibold accent-text-color">Sample Video Questions:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>"Describe your experience with pediatric patients"</li>
                                        <li>"How would you handle an aggressive family member?"</li>
                                        <li>"What makes you exceptional in emergency situations?"</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingExplain;