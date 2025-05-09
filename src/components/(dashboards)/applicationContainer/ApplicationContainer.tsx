"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ApplicationContainer = ({
  applicationData,
  title,
}: {
  applicationData: any[];
  title: string;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = useMemo(() => {
    return applicationData.filter((app) =>
      `${app.fullName} ${app.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, applicationData]);

  return (
    <div className="bg-gray-100">
      {/* 🔙 Back Button */}
      <div className="bg-white sticky py-5 mb-5 top-0">
        <div className=" max-w-[1440px] relative w-11/12 mx-auto">
          <div className=" absolute mt-5 left-5">
            <Link
              href="/user/dashboard"
              className="inline-block main-text-color text-lg mb-5"
            >
              <FaArrowLeft />
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <div className="mb-6 mt-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-6 pb-10 max-w-[1440px] w-11/12 mx-auto">
        {filteredApplications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          filteredApplications.map((application) => {
            const hasResume =
              typeof application?.resume === "string" &&
              application?.resume?.trim().length > 0;

            return (
              <div
                key={application?._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {application?.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {application?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied: {application?.appliedDate}
                    </p>
                    <p
                      className={`${
                        application?.status === "approved"
                          ? "text-green-600"
                          : "text-red-500"
                      } text-sm capitalize`}
                    >
                      Status: {application?.status}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedId(
                        selectedId === application?._id
                          ? null
                          : application?._id
                      )
                    }
                    className="px-4 py-2 accent-bg-color text-white rounded-lg hover:bg-yellow-500 transition"
                  >
                    {selectedId === application?._id ? "Hide" : "View"} Details
                  </button>
                </div>

                {/* Application View Button */}
                <div className="mt-4">
                  <Link
                    href={`/application/view/${application?.jobId}`}
                    className="main-text-color underline"
                  >
                    View Full Application
                  </Link>
                </div>

                {selectedId === application?._id && (
                  <div className="mt-4 border-t pt-4 text-sm space-y-2 text-gray-700">
                    <p>
                      <strong>Phone:</strong> {application?.phone}
                    </p>
                    <p>
                      <strong>DOB:</strong> {application?.dob}
                    </p>
                    <p>
                      <strong>Gender:</strong> {application?.gender}
                    </p>
                    <p>
                      <strong>Address:</strong> {application?.address}
                    </p>
                    <p>
                      <strong>City:</strong> {application?.city}
                    </p>
                    <p>
                      <strong>State:</strong> {application?.state}
                    </p>
                    <p>
                      <strong>ZIP:</strong> {application?.zip}
                    </p>
                    <p>
                      <strong>Contact Method:</strong>{" "}
                      {application?.contactMethod?.join(", ")}
                    </p>
                    <p>
                      <strong>Why Healthcare:</strong>{" "}
                      {application?.whyHealthcare}
                    </p>
                    <p>
                      <strong>Resume:</strong>{" "}
                      {hasResume ? (
                        <Link
                          href={application?.resume}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </Link>
                      ) : (
                        <span className="text-gray-500">Not uploaded</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ApplicationContainer;
