// src/components/SignupForm.tsx
import { useState, useEffect } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./SignupForm.module.css";
import { signup } from "@/api/authApi";
import { UserRequest } from "@/api/interfaces/User";

interface SignupFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupForm({
  onSuccess,
  onSwitchToLogin,
}: SignupFormProps) {
  const [formData, setFormData] = useState<UserRequest>({
    us_id: "",
    us_pw: "",
    us_nm: "",
    us_email: "",
    us_phone: "",
  });

  const [confirmPw, setConfirmPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.us_pw !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await signup(formData);
      if (res.ok) {
        alert("회원가입이 완료되었습니다.");
        onSuccess();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("회원가입에 실패했습니다.");
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("변경된 formData:", formData);
  }, [formData]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        name="us_nm"
        label="이름"
        fullWidth
        size="small"
        required
        value={formData.us_nm}
        onChange={handleChange}
      />
      <TextField
        name="us_id"
        label="아이디"
        fullWidth
        size="small"
        required
        value={formData.us_id}
        onChange={handleChange}
      />
      <TextField
        name="us_pw"
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        fullWidth
        size="small"
        required
        value={formData.us_pw}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="비밀번호 확인"
        type={showPasswordConfirm ? "text" : "password"}
        fullWidth
        size="small"
        required
        value={confirmPw}
        onChange={(e) => setConfirmPw(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        name="us_email"
        label="이메일"
        fullWidth
        size="small"
        required
        value={formData.us_email}
        onChange={handleChange}
      />
      <TextField
        name="us_phone"
        label="전화번호"
        fullWidth
        size="small"
        required
        value={formData.us_phone}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit" className={styles.signupButton}>
        회원가입
      </Button>
      <p className={styles.switchText}>
        이미 계정이 있으신가요?{" "}
        <span className={styles.link} onClick={onSwitchToLogin}>
          로그인
        </span>
      </p>
    </form>
  );
}
