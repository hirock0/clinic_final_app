import Link from "next/link";
import Navbar from "../../dashboard/conponents/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="  h-[calc(100vh-80px)] ">
        <div className=" h-full flex gap-5 max-w-[1440px]  mx-auto">
          <div className=" bg-white  shadow-lg px-10 ">
            <ul className=" text-nowrap flex flex-col gap-10">
              <Link href={"/dashboard"}>
                <li>Dashboard</li>
              </Link>
              <Link href={"/dashboard/jobs"}>
                <li>Recent Jobs</li>
              </Link>
              <Link href={"/dashboard/jobs"}>
                <li>All Jobs</li>
              </Link>
              <Link href={"/dashboard/jobs"}>
                <li>Approved Jobs</li>
              </Link>
            </ul>
          </div>
          <div className="bg-slate-100 px-5 pt-5 w-full">
            <div className=" bg-white h-full p-2 rounded-t-lg shadow-lg overflow-y-scroll ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
