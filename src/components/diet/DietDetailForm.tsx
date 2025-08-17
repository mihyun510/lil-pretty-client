import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function DietDetailForm() {
  return (
    <Box p={4} bgcolor="#ffe4ec" minHeight="100vh">
      {/* 상단: 판 다이어트존 */}

      <Typography variant="h6" fontWeight="bold" mb={2} mx={20}>
        <IconButton>
          <ArrowBackIcon sx={{ fontSize: 30, color: "#f74782ff" }} />
        </IconButton>
        짠 다이어트존
      </Typography>

      <Grid container spacing={2} gap={"60px"} mx={20}>
        {/* 왼쪽: 이미지 + 가격 + 칼로리 */}
        <Grid item xs={12} md={6} sx={{ width: "57%" }}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              width: "100%",
              gap: 5,
            }}
          >
            <CardMedia
              component="img"
              image="https://via.placeholder.com/150"
              alt="음식 이미지"
              sx={{ width: "60%", height: 300, borderRadius: 2 }}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 5,
              }}
            >
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  3,000
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                >
                  가격
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  350
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                >
                  칼로리
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 오른쪽: 레시피 */}
        <Grid item xs={12} md={6} sx={{ width: "40%", flex: 0.98 }}>
          <Box
            sx={{
              width: "100%",
              height: 300,
              borderRadius: 2,
              bgcolor: "#ff7f9f",
              color: "white",
              p: 2,
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h5" fontWeight="bold">
              레시피
            </Typography>
            <Typography variant="body2" mt={1}>
              양배추를 등심등심 썰어주고 살짝 절여주세요 <br />
              들깨가루 2 + 참기름 넣어주세요 <br />밥 위에 양배추 올려 김가루
              살짝에 계란 후라이 올려주기
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* 중간 타이틀 */}
      <Box mt={2} display="flex" alignItems="center" mx={20}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          찜한{" "}
          <Box component="span" color="#ff7f9f" fontWeight="bold">
            다이어트 식단
          </Box>
        </Typography>
        <IconButton aria-label="찜하기">
          <FavoriteIcon sx={{ color: "#f74782ff", fontSize: 40, mx: 3 }} />
        </IconButton>
      </Box>

      {/* 하단: 찜한 음식 리스트 */}
      <Grid
        container
        spacing={2}
        mt={1}
        sx={{ gap: 8, display: "flex", mx: 20 }}
      >
        {["양배추 참치 비빔밥", "들기름 양배추 덮밥", "양배추 스테이크"].map(
          (name, idx) => (
            <Grid item xs={4} key={idx}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  justifyContent: "center",
                  borderRadius: "30px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ variant: "h2", mx: "auto" }}
                >
                  {name}
                </Typography>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    bgcolor: "#ccc",
                    mx: 10,
                    mt: 13,
                    mb: 2,
                  }}
                />
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
