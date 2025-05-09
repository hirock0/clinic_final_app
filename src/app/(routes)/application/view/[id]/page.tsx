import { FindAJob } from "@/app/actions/apis/Apis";
import BackBtn from "@/components/ui/btns/backBtn/BackBtn";
import Link from "next/link";

const View = async (props: any) => {
  const { id } = await props?.params;
  const reqFindJob = await FindAJob(id);
  const job = reqFindJob?.job;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="  shadow-lg p-6 relative max-w-[1440px] w-11/12 mx-auto rounded-xl">
        <div className="absolute left-5 top-5">
          <BackBtn />
        </div>
        <div className=" space-y-8 ">
          {/* Job Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {job?.facilityName}
            </h1>
            <p className="text-xl text-gray-600 mt-2">{job?.facilityType}</p>
            <p className="text-sm text-gray-500 mt-1">
              {job?.address}, {job?.city}, {job?.state} - {job?.zipCode}
            </p>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-300 pt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <p className="text-gray-600">
              <strong>Name:</strong> {job?.contactName}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {job?.contactEmail}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {job?.contactPhone}
            </p>
            <p className="text-gray-600">
              <strong>Institutional Email:</strong> {job?.institutionalEmail}
            </p>
          </div>

          {/* Job Details */}
          <div className="border-t border-gray-300 pt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Job Details
            </h2>
            <p className="text-gray-600">
              <strong>Facility Type:</strong> {job?.facilityType}
            </p>
            <p className="text-gray-600">
              <strong>Job Role:</strong> {job?.labRole}
            </p>
            <p className="text-gray-600">
              <strong>Assignment Duration:</strong> {job?.assignmentDuration}
            </p>
            <p className="text-gray-600">
              <strong>Start Date:</strong> {job?.startDate}
            </p>
            <p className="text-gray-600">
              <strong>Shifts Needed:</strong> {job?.shiftsNeeded?.join(", ")}
            </p>
            <p className="text-gray-600">
              <strong>Positions Available:</strong> {job?.numberOfPositions}
            </p>
            <p className="text-gray-600">
              <strong>Salary Range:</strong> ${job?.minSalary} - $
              {job?.maxSalary}
            </p>
          </div>

          {/* Additional Notes */}
          <div className="border-t border-gray-300 pt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Additional Notes
            </h2>
            <p className="text-gray-600">{job?.additionalNotes}</p>
          </div>

          {/* Staff Needed */}
          <div className="border-t border-gray-300 pt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Staff Needed
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {job?.staffNeeded?.map((role: string, index: number) => (
                <li key={index} className="text-gray-600">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          {/* User Emails */}
          <div className="border-t border-gray-300 pt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Applicants</h2>
            <div className="">{job?.userIdandEmails?.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
