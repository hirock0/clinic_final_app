import Banner from "@/components/(home)/banner/Banner";
import ContactUs from "@/components/(home)/contact_us/ContactUs";
import Faqs from "@/components/(home)/faqs/Faqs";
import LeadershipTeam from "@/components/(home)/leadershipTeam/LeadershipTeam";
import Opportunity from "@/components/(home)/opportunity/Opportunity";
import Strategic_Advisors from "@/components/(home)/strategic_advisors/Strategic_Advisors";
import WhyChooseUs from "@/components/(home)/whyChoseUs/WhyChooseUs";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <Strategic_Advisors />
      <LeadershipTeam />
      <Opportunity />
      <WhyChooseUs />
      <Faqs />
      <ContactUs />
    </main>
  );
};

export default HomePage;
