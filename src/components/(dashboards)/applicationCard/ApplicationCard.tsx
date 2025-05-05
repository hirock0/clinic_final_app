const ApplicationCard = ({
  applications,
  title,
  design,
}: {
  applications: any;
  title: string;
  design: string;
}) => {
  return (
    <div className=" w-full">
      <div className={design}>
        <h1 className=" tracking-tight">
          {title}
          <br /> Applications
        </h1>
        <div className="">
          {!applications ? (
            <div className=" loading loading-spinner"></div>
          ) : (
            <h1>{applications?.length}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
