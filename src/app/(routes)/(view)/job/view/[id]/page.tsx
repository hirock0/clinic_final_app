import { FindAJob } from "@/app/actions/apis/Apis";
import BackBtn from "@/components/ui/btns/backBtn/BackBtn";
const View = async (props: any) => {
  const { id } = await props?.params;
  const reqFindJob = await FindAJob(id);
  const job = await reqFindJob?.job;
  return (
    <div className="max-w-[1440px] mx-auto w-11/12 py-10">
      {/* Back Button */}
      <BackBtn />

      {/* Title */}
      <h1 className="text-3xl font-semibold my-6 text-gray-800">
        {job?.facilityName} – Job Details
      </h1>

      {/* Section: Facility Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold col-span-full">
          Facility Information
        </h2>
        <Info label="Facility Name" value={job?.facilityName} />
        <Info label="Facility Type" value={job?.facilityType} />
        <Info label="Address" value={job?.address} />
        <Info label="City" value={job?.city} />
        <Info label="State" value={job?.state} />
        <Info label="Zip Code" value={job?.zipCode} />
        <Info label="Posted Date" value={job?.postdDate} />
        <Info label="Approved" value={job?.approvedStatus ? "Yes" : "No"} />
      </div>

      {/* Section: Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold col-span-full">
          Contact Information
        </h2>
        <Info label="Contact Name" value={job?.contactName} />
        <Info label="Contact Email" value={job?.contactEmail} />
        <Info label="Contact Phone" value={job?.contactPhone} />
        <Info label="Institutional Email" value={job?.institutionalEmail} />
      </div>

      {/* Section: Job Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold col-span-full">
          Job Requirements
        </h2>
        <Info
          label="Staff Needed"
          value={job?.staffNeeded?.length ? job.staffNeeded.join(", ") : "N/A"}
        />
        <Info label="Number of Positions" value={job?.numberOfPositions} />
        <Info label="Start Date" value={job?.startDate} />
        <Info
          label="Shifts Needed"
          value={job?.shiftsNeeded?.length ? job.shiftsNeeded.join(", ") : "N/A"}
        />
        <Info label="Assignment Duration" value={job?.assignmentDuration} />
        <Info label="Additional Notes" value={job?.additionalNotes} />
      </div>

      {/* Section: Admin Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold col-span-full">Admin Meta Info</h2>
        <Info
          label="Posted By (Email)"
          value={job?.userIdandEmails?.[0]?.userEmail}
        />
        <Info
          label="Applied Date"
          value={job?.userIdandEmails?.[0]?.userAppliedDate}
        />
        <Info label="New Admin Post Date" value={job?.newAdminPost} />
        <Info
          label="Timestamp"
          value={
            job?.newTimeStamp
              ? new Date(job.newTimeStamp).toLocaleString()
              : "N/A"
          }
        />
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

export default View;
