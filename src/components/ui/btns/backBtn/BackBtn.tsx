"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-all duration-200"
    >
      <IoIosArrowBack className="text-lg" />
      Back
    </button>
  );
};

export default BackBtn;
