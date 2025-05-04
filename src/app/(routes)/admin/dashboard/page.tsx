// app/dashboard/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ReqEmployees from "@/components/reqEmployees/reqEmployees";

interface User {
  name: string;
  email: string;
  isApproved: boolean;
}
export default function AdminDashboard() {
  const [employees, setEmployees] = useState<User[]>([]);

  


  const userHandler = async () => {
    try {
      const response = await axios.get("/pages/api/admin/employees");
      const reqUsers = response?.data?.users;
      setEmployees(reqUsers);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };
  useEffect(() => {
    userHandler();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {employees?.length === 0 ? (
        <div className=" h-[50vh] flex items-center justify-center">
          <div className=" loading loading-spinner w-5 h-5"></div>
        </div>
      ) : (
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((item, index) => (
              <ReqEmployees item={item} key={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
