"use client";

import Link from "next/link";
import { useState } from "react";

const ApplicationContainer = ({
  applicationData,
  title,
}: {
  applicationData: any[];
  title: string;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>

      <div className="space-y-6">
        {applicationData.map((application) => {
          const hasResume =
            typeof application.resume === "string" &&
            application.resume.trim().length > 0;

          return (
            <div
              key={application._id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {application.fullName}
                  </p>
                  <p className="text-sm text-gray-500">{application.email}</p>
                  <p className="text-sm text-gray-500">
                    Applied: {application.appliedDate}
                  </p>
                  <p className="text-sm text-green-600 capitalize">
                    Status: {application.status}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelectedId(
                      selectedId === application._id ? null : application._id
                    )
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {selectedId === application._id ? "Hide" : "View"} Details
                </button>
              </div>

              {selectedId === application._id && (
                <div className="mt-4 border-t pt-4 text-sm space-y-2 text-gray-700">
                  <p>
                    <strong>Phone:</strong> {application.phone}
                  </p>
                  <p>
                    <strong>DOB:</strong> {application.dob}
                  </p>
                  <p>
                    <strong>Gender:</strong> {application.gender}
                  </p>
                  <p>
                    <strong>Address:</strong> {application.address}
                  </p>
                  <p>
                    <strong>City:</strong> {application.city}
                  </p>
                  <p>
                    <strong>State:</strong> {application.state}
                  </p>
                  <p>
                    <strong>ZIP:</strong> {application.zip}
                  </p>
                  <p>
                    <strong>Contact Method:</strong>{" "}
                    {application.contactMethod?.join(", ")}
                  </p>
                  <p>
                    <strong>Why Healthcare:</strong> {application.whyHealthcare}
                  </p>
                  <p>
                    <strong>Resume:</strong>{" "}
                    {hasResume ? (
                      <Link
                        href={application.resume}
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
        })}
      </div>
    </div>
  );
};

export default ApplicationContainer;
