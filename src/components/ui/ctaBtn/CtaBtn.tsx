import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
const CtaBtn = () => {
  return (
    <div>
      <Link
        href="#"
        className="border-2 hover:border-white border-[#63e6b8] px-8 py-3 rounded bg-[#63e6b8] text-[#002454] hover:bg-white font-semibold transition-colors duration-300 flex items-center text-lg lg:text-2xl cursor-pointer"
      >
        SEARCH JOBS{" "}
        <span className="ml-1 text-sm">
          <FaExternalLinkAlt />
        </span>
      </Link>
    </div>
  );
};

export default CtaBtn;
