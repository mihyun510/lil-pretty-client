// src/components/SignupForm.tsx
import { useState } from "react";
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
    usId: "",
    usPw: "",
    usNm: "",
    usEmail: "",
    usPhone: "",
    usRole: "",
    token: "",
  });

  const [confirmPw, setConfirmPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.usPw !== confirmPw) {
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

  // useEffect(() => {
  //console.log("변경된 formData:", formData);
  // }, [formData]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        sx={{
          width: "350px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff0f5", // 연핑크 배경
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f8a6c2", // 테두리
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f48fb1", // 포커스 테두리
          },
          "& .MuiInputLabel-root": {
            color: "#f48fb1",
            fontSize: "13px",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            padding: "12px 18px",
            color: "#555",
          },
          mb: 1,
        }}
        name="usNm"
        label="이름"
        fullWidth
        size="small"
        required
        value={formData.usNm}
        onChange={handleChange}
      />
      <TextField
        sx={{
          width: "350px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff0f5", // 연핑크 배경
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f8a6c2", // 테두리
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f48fb1", // 포커스 테두리
          },
          "& .MuiInputLabel-root": {
            color: "#f48fb1",
            fontSize: "13px",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            padding: "12px 18px",
            color: "#555",
          },
          mb: 1,
        }}
        name="usId"
        label="아이디"
        fullWidth
        size="small"
        required
        value={formData.usId}
        onChange={handleChange}
      />
      <TextField
        sx={{
          width: "350px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff0f5", // 연핑크 배경
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f8a6c2", // 테두리
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f48fb1", // 포커스 테두리
          },
          "& .MuiInputLabel-root": {
            color: "#f48fb1",
            fontSize: "13px",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            padding: "12px 18px",
            color: "#555",
          },
          mb: 1,
        }}
        name="usPw"
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        fullWidth
        size="small"
        required
        value={formData.usPw}
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
        sx={{
          width: "350px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff0f5", // 연핑크 배경
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f8a6c2", // 테두리
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f48fb1", // 포커스 테두리
          },
          "& .MuiInputLabel-root": {
            color: "#f48fb1",
            fontSize: "13px",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            padding: "12px 18px",
            color: "#555",
          },
          mb: 1,
        }}
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
        sx={{
          width: "350px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff0f5", // 연핑크 배경
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f8a6c2", // 테두리
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f48fb1", // 포커스 테두리
          },
          "& .MuiInputLabel-root": {
            color: "#f48fb1",
            fontSize: "13px",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            padding: "12px 18px",
            color: "#555",
          },
          mb: 1,
        }}
        name="usEmail"
        label="이메일"
        fullWidth
        size="small"
        required
        value={formData.usEmail}
        onChange={handleChange}
      />
      <TextField
        sx={{
          mb: 1,
          width: "350px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff0f5", // 연핑크 배경
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f8a6c2", // 테두리
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f48fb1", // 포커스 테두리
          },
          "& .MuiInputLabel-root": {
            color: "#f48fb1",
            fontSize: "13px",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            padding: "12px 18px",
            color: "#555",
          },
        }}
        name="usPhone"
        label="전화번호"
        fullWidth
        size="small"
        required
        value={formData.usPhone}
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
