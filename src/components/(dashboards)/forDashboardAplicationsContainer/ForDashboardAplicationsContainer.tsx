"use client";

import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import ApplicationDelBtn from "@/components/ui/btns/applicationDelBtn/ApplicationDelBtn";
import ApplicationApprovedBtn from "@/components/ui/btns/applicationApprovedBtn/ApplicationApprovedBtn";
import { useState, useMemo } from "react";

const ForDashboardAplicationsContainer = ({
  ApplicationData,
  title,
}: {
  ApplicationData: any;
  title: string;
}) => {
  const [applications, setApplications] = useState(ApplicationData);
  const [searchQuery, setSearchQuery] = useState("");

  const applicationHandler = (id: string) => {
    setApplications((prev: any) =>
      prev?.filter((item: any) => item?._id !== id)
    );
  };

  const filteredApplications = useMemo(() => {
    return applications?.filter((app: any) => {
      const query = searchQuery.toLowerCase();
      return (
        app.fullName?.toLowerCase().includes(query) ||
        app.email?.toLowerCase().includes(query) ||
        app.city?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, applications]);

  return (
    <div className="bg-zinc-100 py-6 ">
      <div className="max-w-[1440px] w-11/12 mx-auto sticky top-0">
        {/* Header Section */}
        <div className=" bg-zinc-100 sticky top-0">
          <div className="mb-6   flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <Link
              href="/admin/dashboard"
              className="text-blue-600 flex items-center gap-1 hover:underline"
            >
              <IoArrowBackOutline className="text-lg" /> Back to Dashboard
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {filteredApplications?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No data found</div>
        ) : (
          filteredApplications?.map((app: any, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 mb-6"
            >
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold">Full Name</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.fullName}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Email</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.email}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Phone</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.phone}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Gender</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.gender}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Date of Birth</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.dob}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Applied Date</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.appliedDate}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold">Address</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.address}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">City</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.city}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">State</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.state}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">ZIP Code</label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app.zip}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">
                      Preferred Contact
                    </label>
                    <input
                      disabled
                      className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100"
                      value={app?.contactMethod?.join(", ")}
                    />
                  </div>
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

              <div className="mt-6 flex flex-wrap gap-4">
                <ApplicationDelBtn
                  applicationHandler={applicationHandler}
                  app={app}
                />
                <ApplicationApprovedBtn app={app} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ForDashboardAplicationsContainer;
