// src/components/LoginForm.tsx
import { useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginForm({
  onSuccess,
  onSwitchToSignup,
}: LoginFormProps) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // 여기에 로그인 API 호출 추가
    console.log("로그인 요청:", { userid, password });
    onSuccess(); // 성공 시 모달 닫기
  };

  return (
    <>
      <div className={styles.linkRow}>
        <span
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "#666",
          }}
        >
          계정이 없으신가요?
        </span>
        <span
          style={{
            color: "#666",
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
          onClick={onSwitchToSignup}
        >
          회원가입
        </span>
      </div>

      <TextField
        fullWidth
        label="아이디"
        variant="outlined"
        size="small"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
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
        }}
      />

      <div className={styles.orDivider} />

      <TextField
        fullWidth
        label="비밀번호"
        variant="outlined"
        size="small"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: "350px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff0f5",
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f8a6c2",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #f48fb1",
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
      />
      <div className={styles.orDivider} />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          width: "220px", // 💡 원하는 너비
          margin: "0 auto", // 💡 가운데 정렬
          backgroundColor: " #f8a6c2",
          color: "#fff",
          borderRadius: "30px",
          padding: "6px 0",
          fontSize: "14px",
          fontWeight: "bold",
          minHeight: "36px",
          boxShadow: "0px 5px 1px rgba(0,0,0,0.15)",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#f06292",
          },
        }}
      >
        로그인
      </Button>

      <div className={styles.orDivider}>— OR —</div>
      <button className={`${styles.socialLoginBtn} ${styles.kakao}`}>
        <div className={styles.loginRow}>
          <img src="/kakao-icon.png" alt="kakao" />
          <span>카카오 로그인</span>
        </div>
      </button>

      <button className={`${styles.socialLoginBtn} ${styles.naver}`}>
        <div className={styles.loginRow}>
          <img src="/naver-icon.png" alt="naver" />
          <span>네이버 로그인</span>
        </div>
      </button>
    </>
  );
}
