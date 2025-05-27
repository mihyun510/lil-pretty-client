// src/components/Header.tsx
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./header-footer.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🐷짠예살롱</div>
      <nav className={styles.nav}>
        <Button startIcon={<HomeIcon />}>홈</Button>
        <Button startIcon={<ChatBubbleIcon />}>다이어트</Button>
        <Button startIcon={<FavoriteIcon />}>데이트</Button>
        <Button>후기글</Button>
        <Button>로그인</Button>
        <Button variant="contained" className={styles.logoutButton}>
          로그아웃
        </Button>
      </nav>
    </header>
  );
}
