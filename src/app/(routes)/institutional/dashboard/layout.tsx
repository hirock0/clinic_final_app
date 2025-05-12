import Link from "next/link";
import DashboardNav from "@/components/(dashboards)/dashboardNav/DashboardNav";
import { FaTachometerAlt, FaCog } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import { institutionalSideNavLink } from "@/components/allNavLinks/AllNavLinks";
import DashboardSideBar from "@/components/(dashboards)/dashboardSideBar/DashboardSideBar";
const montserrat = Montserrat({
  weight: ["400", "400"],
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navLinks = [
      { href: "/institutional/profile", label: "Profile", icon: <FaCog /> },
    {
      
      href: "/institutional/dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
  
  ];

  return (
    <div className={` ${montserrat.className} min-h-screen bg-gray-50`}>
      {/* Top Nav */}
      <DashboardNav navLinks={navLinks} flag="institutional" />

      {/* Main Layout */}
      <div className="h-[calc(100vh-80px)] max-w-[1440px] mx-auto flex ">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 hidden lg:block">
          <DashboardSideBar navLinks={institutionalSideNavLink} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100  ">
          <div className="bg-white overflow-y-scroll shadow p-5 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
