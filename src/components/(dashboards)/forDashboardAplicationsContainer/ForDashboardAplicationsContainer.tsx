"use client";
import Link from "next/link";
import ApplicationDelBtn from "@/components/ui/btns/applicationDelBtn/ApplicationDelBtn";
import ApplicationApprovedBtn from "@/components/ui/btns/applicationApprovedBtn/ApplicationApprovedBtn";
import { useState, useMemo } from "react";
import BackBtn from "@/components/ui/btns/backBtn/BackBtn";

const ForDashboardApplicationsContainer = ({
  ApplicationData,
  title,
}: {
  ApplicationData: any[];
  title: string;
}) => {
  const [applications, setApplications] = useState(ApplicationData);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const applicationHandler = (id: string) => {
    setApplications((prev) => prev.filter((item) => item._id !== id));
    setExpandedIds((prev) => prev.filter((item) => item !== id));
  };

  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return applications.filter((app) => {
      return (
        app.fullName?.toLowerCase().includes(query) ||
        app.email?.toLowerCase().includes(query) ||
        app.city?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, applications]);

  return (
    <div className="main-bg-color py-6 min-h-screen">
      <div className="max-w-[1440px] w-11/12 mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-20 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold second-text-color">{title}</h1>
            <div className="">
              <BackBtn/>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-sm mt-4 mb-4">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-yellow-500" /> Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-500" /> Approved
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500" /> Rejected
            </span>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 main-border-color focus:ring-[var(--primary)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Applications */}
        {filteredApplications.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No data found
          </div>
        ) : (
          filteredApplications.map((app) => {
            const isExpanded = expandedIds.includes(app._id);

            return (
              <div
                key={app._id}
                className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 my-6 relative"
              >
                {/* View Button */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold second-text-color">
                      {app.fullName}
                    </h2>
                    <p className="text-sm gray-text-color">{app.email}</p>
                    <div className="mt-4">
                      <Link
                        href={`/application/view/${app?.jobId}`}
                        className="main-text-color underline"
                      >
                        View Full Application
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(app._id)}
                    className="px-4 py-2 rounded purple-color-btn text-black hover:brightness-90 text-sm font-semibold"
                  >
                    {isExpanded ? "Hide" : "View"}
                  </button>
                </div>

                {isExpanded && (
                  <>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 second-text-color">
                      <div className="space-y-4">
                        <FormField label="Full Name" value={app.fullName} />
                        <FormField label="Email" value={app.email} />
                        <FormField label="Phone" value={app.phone} />
                        <FormField label="Gender" value={app.gender} />
                        <FormField label="Date of Birth" value={app.dob} />
                        <FormField
                          label="Applied Date"
                          value={app.appliedDate}
                        />
                      </div>
                      <div className="space-y-4">
                        <FormField label="Address" value={app.address} />
                        <FormField label="City" value={app.city} />
                        <FormField label="State" value={app.state} />
                        <FormField label="ZIP Code" value={app.zip} />
                        <FormField
                          label="Preferred Contact"
                          value={app?.contactMethod?.join(", ")}
                        />
                        <div>
                          <label className="block font-semibold">
                            Why Healthcare
                          </label>
                          <textarea
                            disabled
                            className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                            value={app.whyHealthcare}
                          />
                        </div>
                      </div>
                    </form>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">
                      <ApplicationDelBtn
                        applicationHandler={applicationHandler}
                        app={app}
                      />
                      <ApplicationApprovedBtn app={app} />
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const FormField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block font-semibold">{label}</label>
    <input
      disabled
      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
      value={value}
    />
  </div>
);

export default ForDashboardApplicationsContainer;
