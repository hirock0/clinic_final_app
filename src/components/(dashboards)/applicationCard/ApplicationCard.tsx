import { FaClipboardList } from "react-icons/fa";

const ApplicationCard = ({
  applications,
  title,
  title2,
  design,
}: {
  applications: any;
  title: string;
  title2: string;
  design: string;
}) => {
  return (
    <div className="w-full">
      <div
        className={`transition-all duration-300 hover:shadow-2xl ${design} rounded-xl p-6 flex flex-col items-center justify-center text-center`}
      >
        <FaClipboardList className="text-4xl text-white drop-shadow-md" />
        <h1 className="text-2xl font-semibold text-white drop-shadow mt-2">
          {title} <br /> {title2}
        </h1>
        <div className="mt-3">
          {!applications ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <h2 className="text-3xl font-bold text-white drop-shadow">
              {applications.length}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
