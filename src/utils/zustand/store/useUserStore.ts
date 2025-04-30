"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  token: string;
}

interface UserState {
  user: User | null;
  decodedUser: any;
  employee: any;
  setEmployee: (employeeData: any) => void;
  setDecodedUser: (userData: User) => void;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      decodedUser: null,
      setDecodedUser: (userData) => set({ decodedUser: userData }),
      employee: null,
      setEmployee: (employeeData) => set({ employee: employeeData }),
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null, decodedUser: null, employee: null }),
    }),
    {
      name: "token",
    }
  )
);

export default useUserStore;
