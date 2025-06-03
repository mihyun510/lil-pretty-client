// src/store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  setLoggedIn: (value) => set({ isLoggedIn: value }),
}));
