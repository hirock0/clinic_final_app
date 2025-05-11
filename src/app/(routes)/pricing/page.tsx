import PricingExplain from '@/components/pricing-explain/PricingExplain';
import { FiCheck, FiZap, FiShield, FiClock, FiUser, FiVideo, FiPhone } from 'react-icons/fi';

const PricingPage = () => {
    const plans = [
        {
            name: 'Essential Support Plan',
            price: '$499',
            period: '/Month',
            featured: false,
            features: [
                { icon: <FiUser />, text: 'Access to Caregivers, Medical Assistants, CNAs' },
                { icon: <FiZap />, text: '5 urgent shift requests/month (under 24 hours notice)' },
                { icon: <FiClock />, text: 'Standard staffing (48-hour+ notice) unlimited' },
                { icon: <FiShield />, text: 'Basic background verified workers' }
            ],
            cta: 'Get Started'
        },
        {
            name: 'Professional Support Plan',
            price: '$999',
            period: '/Month',
            featured: true,
            features: [
                { icon: <FiUser />, text: 'Access to Nurses (RNs, LVNs), Caregivers' },
                { icon: <FiUser />, text: 'Telehealth-ready workers' },
                { icon: <FiZap />, text: '10 urgent shift requests/month' },
                { icon: <FiClock />, text: 'Standard staffing unlimited' },
                { icon: <FiShield />, text: 'Candidate replacement guarantee if no-show' },
                { icon: <FiShield />, text: 'FREE initial credential verifications' }
            ],
            cta: 'Popular Choice'
        },
        {
            name: 'Elite Support Plan',
            price: '$1999',
            period: '/Month',
            featured: false,
            features: [
                { icon: <FiUser />, text: 'Access to Doctors (MDs, DOs)' },
                { icon: <FiUser />, text: 'Nurses, caregivers, and therapists' },
                { icon: <FiZap />, text: '20 urgent shift requests/month' },
                { icon: <FiPhone />, text: '24/7 emergency staffing hotline' },
                { icon: <FiVideo />, text: 'Video interview access to pre-approved candidates' },
                { icon: <FiUser />, text: 'Priority matching for specialized staff (surgery, critical care)' }
            ],
            cta: 'Contact Sales'
        }
    ];

    return (
        <>
            <section className="scroll-mt-40 bg-gray-50 py-12 lg:py-20">
                <div className="max-w-7xl mx-auto w-11/12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-extrabold sm:text-4xl">
                            UNITED LINKS CARE PRICING PLAN
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            Choose the perfect plan for your healthcare staffing needs
                        </p>
                    </div>

                    {/* Pricing Plans */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl shadow-lg overflow-hidden ${plan.featured ? 'ring-2 ring-[#308d89]' : 'ring-1 ring-gray-200'}`}
                            >
                                <div className={`px-6 py-8 ${plan.featured ? 'second-bg-color' : 'main-bg-color'}`}>
                                    <h2 className={`text-lg font-medium ${plan.featured ? 'third-text-color' : 'second-text-color'}`}>
                                        {plan.name}
                                    </h2>
                                    <div className="mt-4 flex items-baseline">
                                        <span className={`text-4xl font-extrabold ${plan.featured ? 'third-text-color' : 'second-text-color'}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`ml-1 text-xl font-medium ${plan.featured ? 'text-blue-100' : 'text-gray-500'}`}>
                                            {plan.period}
                                        </span>
                                    </div>
                                    <button
                                        className={`mt-6 w-full px-6 py-3 border border-transparent rounded-md font-medium ${plan.featured ? 'bg-white second-text-color hover:bg-blue-50' : 'second-bg-color third-text-color hover:opacity-90'}`}
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                                <div className="bg-gray-50 px-6 pt-6 pb-8">
                                    <h3 className="text-sm font-medium second-text-color mb-4">Includes:</h3>
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <div className="flex-shrink-0 main-text-color">
                                                    {feature.icon}
                                                </div>
                                                <span className="ml-3 text-base text-gray-500">
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enterprise Option */}
                    <div className="mt-16 bg-white shadow-lg rounded-2xl overflow-hidden">
                        <div className="px-6 py-8 sm:px-10 sm:py-12">
                            <div className="md:flex md:items-center md:justify-between">
                                <div className="md:w-1/2">
                                    <h2 className="text-2xl font-bold second-text-color">Need custom staffing solutions?</h2>
                                    <p className="mt-4 text-lg text-gray-500">
                                        Contact us for enterprise-level healthcare staffing plans tailored to your organization's specific needs.
                                    </p>
                                </div>
                                <div className="mt-8 md:mt-0 md:ml-8">
                                    <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md second-text-color accent-bg-color hover:opacity-90 cursor-pointer">
                                        Contact Enterprise Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PricingExplain />
        </>
    );
};

export default PricingPage;