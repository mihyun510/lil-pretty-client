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

export default function DietDetailForm() {
  return (
    <Box p={3} bgcolor="#ffe4ec" minHeight="100vh">
      {/* 상단: 판 다이어트존 */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        짠 다이어트존
      </Typography>

      <Grid container spacing={2}>
        {/* 왼쪽: 이미지 + 가격 + 칼로리 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <CardMedia
              component="img"
              image="https://via.placeholder.com/150"
              alt="음식 이미지"
              sx={{ width: 180, borderRadius: 2 }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                3,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                가격
              </Typography>
              <Typography variant="h6" fontWeight="bold" mt={1}>
                350
              </Typography>
              <Typography variant="body2" color="text.secondary">
                칼로리
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 오른쪽: 레시피 */}
        <Grid item xs={12} md={6}>
          <Box bgcolor="#ff7f9f" color="white" p={2} borderRadius={1}>
            <Typography variant="h6" fontWeight="bold">
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
      <Box mt={4} display="flex" alignItems="center">
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          찜한{" "}
          <Typography component="span" color="error" fontWeight="bold">
            다이어트 식단
          </Typography>
        </Typography>
        <IconButton color="error">
          <FavoriteIcon />
        </IconButton>
      </Box>

      {/* 하단: 찜한 음식 리스트 */}
      <Grid container spacing={2} mt={1}>
        {["양배추 참치 비빔밥", "들기름 양배추 덮밥", "양배추 스테이크"].map(
          (name, idx) => (
            <Grid item xs={4} key={idx}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "#ccc",
                    mx: "auto",
                    mb: 1,
                  }}
                />
                <Typography variant="body2">{name}</Typography>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
