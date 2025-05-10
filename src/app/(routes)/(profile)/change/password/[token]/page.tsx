"use client";
import React, { useEffect, useState } from "react";
import PasswordResetForm from "@/components/(profile)/passwordResetForm/PasswordResetForm";
import { useParams } from "next/navigation";
import swal from "sweetalert";
import axios from "axios";
const PasswordPage = () => {
  const token = useParams()?.token;
  const [verify, setVerify] = useState(null);
  const [verifyUser, setVerifyUser] = useState(null);
  useEffect(() => {
    const TokenHandler = async () => {
      try {
        const response = await axios.get(`/pages/api/tokenVerify/${token}`);
        const tokenVerified = await response?.data;
        if (tokenVerified?.success) {
          setVerify(tokenVerified?.success);
          setVerifyUser(tokenVerified?.user);
          swal({
            title: "Email verified",
            icon: "success",
          });
        } else {
          swal({
            title: response?.data?.message,
            icon: "warning",
          });
        }
      } catch (error: any) {
        throw new Error(error?.message);
      }
    };
    TokenHandler();
  }, [verify]);
  if (verify === null) {
    return (
      <div className=" h-[70vh] w-full flex items-center justify-center">
        <div className="loading loading-spinner"></div>;
      </div>
    );
  }
  if (!verify) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow text-red-600 font-medium">
          Your reset link is invalid or expired.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>
        <PasswordResetForm verifyUser={verifyUser} />
      </div>
    </div>
  );
};

export default PasswordPage;
