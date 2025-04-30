import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" flex ">
      <div className=" h-[calc(100vh-120px)] overflow-y-scroll w-1/4 px-5 bg-red-200 ">
        <ul className=" ">
          <Link href={"/admin/dashboard"}>
            <li>Dashboard</li>
          </Link>
          <Link href={"/admin/dashboard"}>
            <li>Dashboard</li>
          </Link>
          <Link href={"/admin/dashboard"}>
            <li>Dashboard</li>
          </Link>
        </ul>
      </div>
      <div className="  h-[calc(100vh-120px)] overflow-y-scroll w-3/4 bg-green-100">
        {children}
      </div>
    </main>
  );
};

export default Layout;
