import Link from "next/link";
const DashboardSideBar = ({ navLinks }: { navLinks: any }) => {
  return (
    <nav>
      <ul className="space-y-6 text-gray-700 font-medium">
        {navLinks?.map((item: any, index: any) => (
          <li key={index} className=" flex items-center gap-5 group">
            <div className=" text-2xl">{item?.icon}</div>
            <div className=" flex flex-col overflow-hidden">
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
  );
};

export default DashboardSideBar;
