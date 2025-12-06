// src/components/Header.tsx
import { Button, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import styles from "./headerFooter.module.css";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { isLoggedIn, logout, user } = useAuthStore();
  const { openLoginModal } = useAuthModalStore();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    navigate("/");
    openLoginModal();
  };

  // ✅ 마우스 올리면 메뉴 열기
  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // ✅ 마우스가 메뉴 영역 벗어나면 닫기
  const handleMouseLeave = () => {
    setAnchorEl(null);
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
              onClick={() => navigate("/date/main")}
              sx={{ color: "#000000" }}
            >
              데이트
            </Button>
            <Button
              sx={{ color: "#000000" }}
              startIcon={<RoomIcon sx={{ color: "#f29bb8" }} />}
              onClick={() => navigate("/swellingmap/main")}
            >
              붓기맵
            </Button>
            {/* {alert(user?.usRole)} */}
            {/* ✅ 관리자 전용 메뉴 (드롭다운) */}
            {user?.usRole === "ADMIN" && (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: "inline-block" }}
              >
                <Button
                  id="admin-menu-button"
                  aria-controls={open ? "admin-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{
                    color: "#000000",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  관리자 MENU ▼
                </Button>
                <Menu
                  id="admin-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMouseLeave}
                  MenuListProps={{
                    onMouseEnter: () => setAnchorEl(anchorEl),
                    onMouseLeave: handleMouseLeave,
                    sx: {
                      borderRadius: 2,
                      mt: 1,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/user/main");
                      handleMouseLeave();
                    }}
                  >
                    사용자 권한 관리
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/commoncode/main");
                      handleMouseLeave();
                    }}
                  >
                    공통코드 관리
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/meal/main");
                      handleMouseLeave();
                    }}
                  >
                    식단 관리
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/meal/rec");
                      handleMouseLeave();
                    }}
                  >
                    추천 식단 관리
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/date/main");
                      handleMouseLeave();
                    }}
                  >
                    데이트 코스 관리
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/swellingmap/main");
                      handleMouseLeave();
                    }}
                  >
                    붓기맵 맵 관리
                  </MenuItem>
                </Menu>
              </div>
            )}

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
