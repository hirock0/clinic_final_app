import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
const Search_Jobs = () => {
  return (
    <div>
      <>
        <Link
          href="/search-jobs"
          className="text-lg font-semibold py-2 px-4 border-2 rounded-md hover:bg-[#fafafa] hover:text-[#0a0a0a] border-[#fafafa] bg-transparent text-[#fafafa] transition-colors duration-300 ease-in-out cursor-pointer flex items-center gap-1"
        >
          SEARCH JOBS
          <span className="ml-1 text-sm">
            <FaExternalLinkAlt />
          </span>
        </Link>
      </>
    </div>
  );
};

export default Search_Jobs;
