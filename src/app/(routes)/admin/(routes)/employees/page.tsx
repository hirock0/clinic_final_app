"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ReqEmployees from "@/components/reqEmployees/reqEmployees";
import BackBtn from "@/components/ui/btns/backBtn/BackBtn";

interface User {
  name: string;
  email: string;
  isApproved: boolean;
  role: string;
}

export default function Employees() {
  const [employees, setEmployees] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const userHandler = async () => {
    try {
      const response = await axios.get("/pages/api/admin/employees");
      const reqUsers = response?.data?.users;
      setEmployees(reqUsers);
    } catch (error: any) {
      throw new Error(error.message)
    }
  };

  useEffect(() => {
    userHandler();
  }, []);

  const filteredEmployees = employees?.filter((user) =>
    (user.name + user.email).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8">
      <div className="max-w-[1440px] w-11/12 mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackBtn />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          Admin Dashboard - Employees
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {employees.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center">
            <span className="loading loading-spinner w-8 h-8 text-primary"></span>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No matching employees found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="table w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees?.map((item, index) => (
                  <ReqEmployees key={index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
