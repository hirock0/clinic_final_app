import { FaClipboardList } from "react-icons/fa";

const ApplicationCard = ({
  applications,
  title,
  title2,
}: {
  applications: any;
  title: string;
  title2: string;
}) => {
  return (
    <div className="w-full">
      <div
        className={`transition-all duration-300 hover:shadow-2xl  rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white shadow-2xl hover:scale-105`}
      >
        <FaClipboardList className="text-4xl text-cyan-700 " />
        <h1 className="text-2xl   mt-2">
          {title} <br /> {title2}
        </h1>
        <div className="mt-3">
          {!applications ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <h2 className="text-3xl font-bold  ">
              {applications.length}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
