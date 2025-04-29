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
  setDecodedUser: (userData: User) => void;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      decodedUser: null,
      setDecodedUser: (userData) => set({ decodedUser: userData }),
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null, decodedUser: null }),
    }),
    {
      name: "token",
    }
  )
);

export default useUserStore;
