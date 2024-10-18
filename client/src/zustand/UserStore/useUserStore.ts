import { create } from 'zustand';

interface User {
  _id: string;
  email: string;
  username: string;
  profileAvatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  cleanUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user?: User) => set({ user: user ?? null }),
  cleanUser: () => set({ user: null }),
}));
