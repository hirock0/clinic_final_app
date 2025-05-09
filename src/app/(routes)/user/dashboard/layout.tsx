import DashboardNav from "@/components/(dashboards)/dashboardNav/DashboardNav";
import { FaTachometerAlt, FaCog } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import { userSideNavLink } from "@/components/allNavLinks/AllNavLinks";
import DashboardSideBar from "@/components/(dashboards)/dashboardSideBar/DashboardSideBar";
const montserrat = Montserrat({
  weight: ["400", "400"],
  subsets: ["latin"],
});
const Layout = ({ children }: { children: React.ReactNode }) => {
  const navLinks = [
    { href: "/user/profile", label: "Profile", icon: <FaCog /> },
    { href: "/user/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  ];
  return (
    <div className={` ${montserrat.className} min-h-screen bg-gray-50`}>
      {/* Top Nav */}
      <DashboardNav navLinks={navLinks} flag="user" />

      {/* Main Layout */}
      <div className="h-[calc(100vh-80px)] max-w-[1440px] mx-auto flex gap-5">
        {/* Sidebar */}
        <aside className="w-64 overflow-y-scroll  soft-bg-purple shadow-md p-6 hidden lg:block">
          <DashboardSideBar navLinks={userSideNavLink} />
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
