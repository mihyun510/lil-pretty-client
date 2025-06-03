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
        <span>계정이 없으신가요?</span>
        <span
          style={{ color: "black", cursor: "pointer" }}
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
        className={styles.inputField}
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
      />

      <div className={styles.orDivider} />

      <TextField
        fullWidth
        label="비밀번호"
        variant="outlined"
        size="small"
        type={showPassword ? "text" : "password"}
        className={styles.inputField}
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
      />
      <div className={styles.orDivider} />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={styles.loginButton}
        onClick={handleSubmit}
      >
        로그인
      </Button>

      <div className={styles.orDivider}>— OR —</div>

      <button className={`${styles.socialLoginBtn} ${styles.kakao}`}>
        카카오 로그인
      </button>
      <button className={`${styles.socialLoginBtn} ${styles.naver}`}>
        네이버 로그인
      </button>
    </>
  );
}
