# 조금 예뻐도 돼?(Diet & Date Web)

> **Vite + React + TypeScript** 웹 사이드 프로젝트

간단 설명: 다이어트 존(Diet Zone)과 데이트 존(Date Zone)을 중심으로 한 사이드 프로젝트입니다. 로그인(소셜로그인), 회원가입, 식단/레시피 탐색, 데이트 코스 추천·정렬·리뷰, KaKao Map 기반 즐겨찾기 맵, 물 섭취 챌린지 등 기능을 제공하는 SPA입니다.주요 기능 (한눈에)

### 공통

* 로그인: 일반 로그인, 소셜 로그인(카카오)
* 회원가입: 일반 회원가입, 소셜 회원가입(카카오)

### 다이어트존 (Diet Zone)

* 메인

  * `식단 보러가기` (식단 목록으로 이동)
  * `식단 가져오기` (추천 식단 파일 다운로드)
  * `오늘의 추천 식단` 보여주기
  * 유튜브 링크(동영상) 연결
* 식단 목록 -> 레시피 조회 화면(선택 시 이동)
* 레시피 조회 화면: 재료, 조리법, 칼로리 등 상세 정보 노출

### 데이트존 (Date Zone)

* 메인

  * 전체 데이트 유형 목록
  * 가격 슬라이더로 가격대 필터링
  * 각 유형 클릭 시 해당 유형의 상세 리스트로 이동
* 상세

  * 선택된 데이트 유형에 속한 개별 코스/장소를 순위별로 표시
  * 코스 클릭 시 코스 디테일 화면(위치, 가격, 설명 등)
* 리뷰

  * 각 코스별 사용자 이미지, 리뷰, 별점 표시

### 붓기맵 (Map)

* 관리자 지정 즐겨찾기 리스트를 KaKao Map에 마크
* 탭별 카테고리 조회 및 리스트 표시
* 즐겨찾기(북마크) 기능

### 챌린지 (Hydration Challenge)

* 하루 물 2L 채우기 챌린지(4칸으로 구분)
* 물방울 이미지에 따라 채워지는 UI
* 하루 기록: 달력에서 일별 섭취량 확인

---

## 기술 스택

* 프레임워크: React
* 번들러: Vite
* 언어: TypeScript
* 스타일: CSS Modules / Sass / Tailwind (선택)
* 지도: KaKao Map JS SDK
* 인증: JWT(백엔드) + OAuth 연동 (Kakao)
* 상태관리: React Context / Zustand / Recoil (선택사항)
* HTTP 클라이언트: axios
* UI 라이브러리: Material UI (권장)

---

## 프로젝트 구조 제안

```
src/
├─ api/                      # 서버 통신 관련 (axios instance, api 함수 등)
├─ components/               # 주요 컴포넌트
│  ├─ auth/                  # 로그인, 회원가입, OAuth 버튼
│  ├─ date/                  # 데이트존 관련 컴포넌트
│  ├─ diet/                  # 식단(다이어트존) 관련 컴포넌트
│  ├─ intro/                 # 메인 / 인트로 화면
│  ├─ layout/                # Header, Footer, Layout 등 공통 UI
│  ├─ modals/                # 로그인/회원가입/기타 모달
│  └─ swellingMap/           # 붓기맵 (KaKao Map 관련 UI)
│     └─ index.ts
├─ hooks/                    # 커스텀 훅 (useAuth, useFetch 등)
├─ lib/                      # 외부 라이브러리 래퍼 또는 유틸
├─ pages/                    # 페이지 단위 컴포넌트
├─ store/                    # 상태관리 (zustand/recoil)
├─ App.tsx                   # 루트 컴포넌트
├─ AuthenticatedContents.tsx # 로그인된 사용자용 화면
├─ ModalContent.tsx          # 모달 관련 로직
├─ UnAuthenticatedContents.tsx # 비로그인 사용자용 화면
└─ app-routes.tsx            # 라우터 설정
```

---

## 라우팅

```
/ -> LandingPage (메인 랜딩 페이지)
/swellingmap/main -> SwellingMapMainPage (붓기맵 메인 / Kakao Map + 즐겨찾기 리스트)
/swellingmap/challenge -> SwellingMapChallengePage (물 섭취 챌린지 / 하루 2L 기록 달력)
/diet/main -> DietMainPage (다이어트존 메인 / 추천 식단, 유튜브 링크)
/diet/list -> DietMasterPage (식단 마스터 목록)
/diet/detail/:mmCd -> DietDetailPage (식단 디테일 / 재료, 조리법, 칼로리)
/date/main -> DateMainPage (데이트존 메인 / 유형 목록, 가격 필터)
/date/detail/:dmCd -> DateDetailPage (데이트 유형 상세 / 코스 목록)
/date/detailCourse/:ddCd/:dmCd -> DateDetailCoursePage (코스 디테일 / 위치, 가격, 리뷰)
```

---

## 인증 흐름

1. 일반 로그인: `/api/login`에 credential POST -> 서버에서 JWT 발급
2. OAuth (Kakao / Naver)

   * 프론트에서 OAuth 시작 -> Redirect/Popup으로 승인 -> 백엔드 콜백에서 access token 받아 사용자 식별 후 JWT 발급
3. 토큰 보관: `httpOnly` 쿠키(가능하면) 또는 `localStorage`(초기 구현)
4. axios 인터셉터로 요청 시 JWT 자동 포함

---

## API 설계

* `POST /auth/login` -> 로그인
* `POST /auth/save/user`  -> 회원가입
* `POST /api/date/detail/getDateDtlItems` -> 데이트존 목록 조회
* `POST /api/date/detail/getDateDtlReviews` -> 데이트존 리뷰 조회
* `POST /api/date/detail/getDateDtlCourse` -> 데이트존 상세 코스 조회
* `POST /api/date/detail/saveDateDtlItems` -> 데이트존 리뷰 저장
* `POST /api/date/master/dateItems` -> 데이트존 메인 목록 조회
* `POST /api/diet/detail/getMealDtlItems` -> 다이어트존 식단 상세 조
* `POST /api/diet/detail/getMealFavoriteItems` -> 다이어트존 식단 즐겨찾기 목록 조회
* `POST /api/diet/main/mealRecItemse` -> 다이어트존 추천 식단 목록 조회
* `POST /api//diet/master/mealsItems` -> 다이어트존 식단 목록 조회
* `POST /api/diet/master/saveMealFavorite` -> 다이어트존 식단 즐겨찾기 저장
* `POST /api/file/upload` -> 파일 업로드드
* `POST /api/file/download/${folder}/${fileName}` -> 파일 다운로드
* `POST /api/swellingMap/challenge/getWaterDailyItem` -> 하루 물 섭취량 조회
* `POST /api/swellingMap/challenge/getWaterDailyItem` -> 하루 물 섭취량 조회
* `GET /api/swellingMap/challenge/saveWaterDailyItem` -> 하루 물 섭취량 저장

---

## 개발 / 실행 (로컬)

```bash
# 설치
npm install
# 개발 서버
npm run dev
# 빌드
npm run build
```

---

## 향후 개선 아이디어

* 챗봇 기능 추가
* client / admin 권한 구분한 도메인 구현

---

