// src/components/SignupModal.tsx
import AuthDialogWrapper from "./AuthDialogWrapper";
import { SignupForm } from "@/components";
import { useAuthModalStore } from "@/store/useAuthModalStore";

export default function SignupModal() {
  const { openModal, closeModal, openLoginModal } = useAuthModalStore();

  return (
    <AuthDialogWrapper
      open={openModal === "signup"}
      onClose={closeModal}
      title="회원가입"
    >
      <SignupForm onSuccess={closeModal} onSwitchToLogin={openLoginModal} />
    </AuthDialogWrapper>
  );
}
