import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
const Search_Jobs = () => {
  return (
    <div>
      <>
        <Link
          href="/search-jobs"
          className="third-text-color border-2 white-border-color  rounded-md px-6 py-2 text-lg font-semibold cursor-pointer flex items-center gap-1"
        >
          SEARCH JOBS{" "}
          <span className="ml-1 text-sm">
            <FaExternalLinkAlt />
          </span>
        </Link>
      </>
    </div>
  );
};

export default Search_Jobs;
