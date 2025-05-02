import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { FcAcceptDatabase } from "react-icons/fc";

export const adminSideNavLink = [
  {
    title: "Home",
    href: "/",
    icon: <IoHomeSharp />,
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <AiOutlineDashboard />,
  },
  {
    title: "Accepted Jobs",
    href: "/admin/dashboard/accepted_jobs",
    icon: <FcAcceptDatabase />,
  },
];

export const userSideNavLink = [
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
    {
      title: "User Jobs",
      href: "/user/dashboard/accepted_jobs",
      icon: <FcAcceptDatabase />,
    },
  ];

  export const employeeSideNavLink = [
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