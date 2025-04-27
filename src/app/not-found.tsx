// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";
import { FaSadTear } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800 p-4">
      <div className="text-9xl mb-6 animate-bounce">
        <FaSadTear className="text-blue-400" />
      </div>
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-center mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300"
      >
        <MdArrowBack className="text-2xl" />
        Go Home
      </button>
    </div>
  );
}
