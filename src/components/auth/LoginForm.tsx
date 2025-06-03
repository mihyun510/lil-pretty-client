// src/pages/LoginPage.tsx
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.closeButton}>
          <CloseIcon />
        </div>
        <div className={styles.pigIcon}>🐷</div>
        <h2 className={styles.title}>로그인</h2>
        <div className={styles.linkRow}>
          <span>계정이 없으신가요?</span>
          <span style={{ color: "black", cursor: "pointer" }}>회원가입</span>
        </div>
        <TextField
          fullWidth
          label="아이디"
          variant="outlined"
          className={styles.inputField}
          size="small"
        />
        <div className={styles.orDivider} />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          variant="outlined"
          size="small"
          className={styles.inputField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Visibility />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={styles.orDivider}>— OR —</div>
        <button className={`${styles.socialLoginBtn} ${styles.kakao}`}>
          카카오 로그인
        </button>
        <button className={`${styles.socialLoginBtn} ${styles.naver}`}>
          네이버 로그인
        </button>
      </div>
    </div>
  );
}
