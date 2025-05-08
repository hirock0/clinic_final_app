export const dynamic = "force-dynamic";
import { FindAJob } from "@/app/actions/apis/Apis";
import ClientForm from "@/components/clientForm/ClientForm";
const Add_infoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const findJob = await FindAJob(id);
  const job = findJob?.job;
  return (
    <div>
      <ClientForm job={job} />
    </div>
  );
};

export default Add_infoPage;
