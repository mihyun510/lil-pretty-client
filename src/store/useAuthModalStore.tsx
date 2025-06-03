// src/store/authModalStore.ts
import { create } from "zustand";

interface AuthModalState {
  openLogin: boolean;
  openSignup: boolean;
  openModal: "login" | "signup" | null;

  openLoginModal: () => void;
  openSignupModal: () => void;
  closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  openLogin: false,
  openSignup: false,
  openModal: null,

  openLoginModal: () =>
    set(() => ({
      openLogin: true,
      openSignup: false,
      openModal: "login",
    })),
  openSignupModal: () =>
    set(() => ({
      openLogin: false,
      openSignup: true,
      openModal: "signup",
    })),
  closeModal: () =>
    set(() => ({
      openLogin: false,
      openSignup: false,
      openModal: null,
    })),
}));
