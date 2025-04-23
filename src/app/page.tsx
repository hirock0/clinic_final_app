import Banner from "@/components/banner/Banner";
import ContactUs from "@/components/contact_us/ContactUs";
import Faqs from "@/components/faqs/Faqs";
import Opportunity from "@/components/opportunity/Opportunity";
import Strategic_Advisors from "@/components/strategic_advisors/Strategic_Advisors";
import WhyChooseSBT from "@/components/whyChoseSBT/WhyChooseSBT";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <Strategic_Advisors />
      <Opportunity />
      <WhyChooseSBT />
      <Faqs />
      <ContactUs />
    </main>
  );
};

export default HomePage;
