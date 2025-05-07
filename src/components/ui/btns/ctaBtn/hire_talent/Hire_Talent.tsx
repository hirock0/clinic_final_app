"use client";
import { fetchData } from "@/utils/redux/slices/slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
const Hire_Talent = ({ design }: { design: any }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.slices);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const onTalentHandler = () => {
    if (user?.role === "employee" || user?.role === "approvedEmployee") {
      swal({
        title: "You are employee",
        text: "Login for institutional",
        icon: "warning",
      });
    } else if (user?.role === "user") {
      swal({
        title: "You are user",
        text: "Login for institution",
        icon: "warning",
      });
    } else {
      router.push("/hire-talent");
    }
  };

  return (
    <button onClick={onTalentHandler} className={design}>
      HIRE TALENT
    </button>
  );
};

export default Hire_Talent;
