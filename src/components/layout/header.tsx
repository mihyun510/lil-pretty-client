// src/components/Header.tsx
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./headerFooter.module.css";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthModalStore } from "@/store/useAuthModalStore";

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore();
  const { openLoginModal } = useAuthModalStore();

  const handleLogout = () => {
    logout();
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
            <Button startIcon={<HomeIcon />}>홈</Button>
            <Button startIcon={<ChatBubbleIcon />}>다이어트</Button>
            <Button startIcon={<FavoriteIcon />}>데이트</Button>
            <Button>붓기맵</Button>
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
