// src/components/Header.tsx
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import styles from "./headerFooter.module.css";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore();
  const { openLoginModal } = useAuthModalStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    openLoginModal();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/menu_log.png" alt="로고" className={styles.logoImage} />
      </div>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <>
            <Button
              startIcon={<HomeIcon sx={{ color: "#f29bb8" }} />}
              onClick={() => navigate("/")}
              sx={{ color: "#000000" }}
            >
              홈
            </Button>
            <Button
              startIcon={<ChatBubbleIcon sx={{ color: "#f29bb8" }} />}
              onClick={() => navigate("/diet/main")}
              sx={{ color: "#000000" }}
            >
              다이어트
            </Button>
            <Button
              startIcon={<FavoriteIcon sx={{ color: "#f29bb8" }} />}
              sx={{ color: "#000000" }}
            >
              데이트
            </Button>
            <Button
              sx={{ color: "#000000" }}
              startIcon={<RoomIcon sx={{ color: "#f29bb8" }} />}
            >
              붓기맵
            </Button>
            <Button
              variant="contained"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <Button
            sx={{
              width: "100px", // 💡 원하는 너비
              color: "#888",
              fontSize: "13px",
              fontWeight: "bold",
              "&:hover": {},
            }}
            onClick={openLoginModal}
          >
            로그인
          </Button>
        )}
      </nav>
    </header>
  );
}
