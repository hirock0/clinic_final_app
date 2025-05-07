export const AllJobs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/allJobs`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
export const FindAJob = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/pages/api/allJobs/findAjob/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return await res.json();
  } catch (error) {
    return null;
  }
};

