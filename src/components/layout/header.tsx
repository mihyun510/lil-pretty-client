// src/components/Header.tsx
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./headerFooter.module.css";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthModalStore } from "@/store/useAuthModalStore";

export default function Header() {
  const { isLoggedIn, setLoggedIn } = useAuthStore();
  const { openLoginModal } = useAuthModalStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
    // 페이지 이동이나 리프레시도 여기에 추가 가능
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>🐷짠예살롱</div>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <>
            <Button startIcon={<HomeIcon />}>홈</Button>
            <Button startIcon={<ChatBubbleIcon />}>다이어트</Button>
            <Button startIcon={<FavoriteIcon />}>데이트</Button>
            <Button>후기글</Button>
            <Button
              variant="contained"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <Button onClick={openLoginModal}>로그인</Button>
        )}
      </nav>
    </header>
  );
}
