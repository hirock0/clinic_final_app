"use client";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/redux/slices/slice";
export default function AwaitingApproval() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.slices);

  console.log(user)
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const handler = async () => {
      try {
        if (!user) {
          return;
        } else {
          await axios.get(`/pages/api/admin/token_change/${user?.role}`);
        }
      } catch (error: any) {
        throw new Error(error?.message);
      }
    };
    handler();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center p-4">
      <iframe src="https://lottie.host/embed/0401a5de-29b1-4c2a-b7b2-6abbb5a99604/txGjENI47E.lottie"></iframe>
      <h1 className="text-2xl font-bold">Awaiting Approval</h1>
      <p className="text-gray-600">
        Your account is pending admin approval. Please wait...
      </p>
    </div>
  );
}
