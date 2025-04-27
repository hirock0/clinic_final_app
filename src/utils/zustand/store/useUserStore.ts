'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  token: string;
}

interface UserState {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'token',
    }
  )
);

export default useUserStore;
