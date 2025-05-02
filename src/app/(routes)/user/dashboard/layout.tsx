import Link from "next/link";
import DashboardNav from "@/components/dashboardNav/DashboardNav";
import { FaTachometerAlt, FaCog } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { FcAcceptDatabase } from "react-icons/fc";
const montserrat = Montserrat({
  weight: ["400", "400"],
  subsets: ["latin"],
});
const Layout = ({ children }: { children: React.ReactNode }) => {

  const navLinks = [
    { href: "/user/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { href: "/profile/settings", label: "Settings", icon: <FaCog /> },
  ];
  const sideNavLink = [
    {
      title: "Home",
      href: "/",
      icon: <IoHomeSharp />,
    },
    {
      title: "Dashboard",
      href: "/user/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      title: "Accepted Jobs",
      href: "/user/dashboard/accepted_jobs",
      icon: <FcAcceptDatabase />,
    },
  ];

  return (
    <div className={` ${montserrat.className} min-h-screen bg-gray-50`}>
      {/* Top Nav */}
      <DashboardNav navLinks={navLinks} flag="user" />

      {/* Main Layout */}
      <div className="h-[calc(100vh-80px)] max-w-[1440px] mx-auto flex gap-5">
        {/* Sidebar */}
        <aside className="w-64 overflow-y-scroll bg-gradient-to-tr from-yellow-400/40 via-yellow-300/30 to-white shadow-md p-6 hidden md:block">
          <nav>
            <ul className="space-y-6 text-gray-700 font-medium">
              {sideNavLink?.map((item: any, index) => (
                <li key={index} className=" flex items-center gap-5 group">
                  <div className=" text-2xl">{item?.icon}</div>
                  <div className=" flex flex-col  overflow-hidden">
                    <Link
                      href={item?.href}
                      className="hover:text-indigo-600 transition"
                    >
                      {item?.title}
                    </Link>
                    <span className=" -translate-x-[110%] group-hover:translate-x-0 transition-all rounded-full h-0.5 bg-purple-600 w-full"></span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
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
