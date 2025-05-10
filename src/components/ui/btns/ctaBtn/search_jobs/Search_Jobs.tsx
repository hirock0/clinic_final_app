import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
const Search_Jobs = () => {
  return (
    <div>
      <>
        <Link
          href="/search-jobs"
          className="text-base lg:text-lg font-semibold py-1.5 px-2.5 md:py-2 md:px-4 border-2 rounded md:rounded-md hover:bg-[#fafafa] hover:text-[#0a0a0a] border-[#fafafa] bg-transparent text-[#fafafa] transition-colors duration-300 ease-in-out cursor-pointer flex items-center gap-1"
        >
          SEARCH JOBS
          <span className="ml-1 text-xs md:text-sm">
            <FaExternalLinkAlt />
          </span>
        </Link>
      </>
    </div>
  );
};

export default Search_Jobs;
