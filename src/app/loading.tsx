"use client";

import { FaSpinner } from "react-icons/fa";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <FaSpinner className="animate-spin text-primary text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-primary">Loading...</h2>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we load your content
        </p>
      </div>
    </div>
  );
};

export default Loading;
