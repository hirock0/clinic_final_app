const ApplicationCard = ({
  applications,
  title,
  title2,
  design,
}: {
  applications: any;
  title: string;
  title2:string;
  design: string;
}) => {
  
  
  return (
    <div className=" w-full">
      <div className={design}>
        <h1 className=" tracking-tight">
          {title}
          <br /> {title2}
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
