// src/store/useAuthStore.ts
import { create } from "zustand";
import { UserRequest } from "@/api/interfaces/User";

interface AuthState {
  isLoggedIn: boolean;
  user: UserRequest | null;
  setLoggedIn: (value: boolean) => void;
  setUser: (user: UserRequest | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  user: null,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("accessToken");
    //localStorage.removeItem("refreshToken");
    set({ isLoggedIn: false, user: null });
  },
}));
