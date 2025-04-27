import Navbar from "./conponents/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className=" bg-slate-100">
        <div className=" max-w-[1440px] w-11/12 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
