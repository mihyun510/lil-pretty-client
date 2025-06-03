// src/components/LoginModal.tsx
import AuthDialogWrapper from "./AuthDialogWrapper";
import { LoginForm } from "@/components";
import { useAuthModalStore } from "@/store/useAuthModalStore";

export default function LoginModal() {
  const { openModal, closeModal, openSignupModal } = useAuthModalStore();

  return (
    <AuthDialogWrapper
      open={openModal === "login"}
      onClose={closeModal}
      title="로그인"
    >
      <LoginForm onSuccess={closeModal} onSwitchToSignup={openSignupModal} />
    </AuthDialogWrapper>
  );
}
