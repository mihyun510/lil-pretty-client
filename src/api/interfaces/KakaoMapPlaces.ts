export interface KakaoMapPlacesItems {
  place_id: string; // 장소 ID
  place_name: string; // 장소 이름
  category_name: string; // 전체 카테고리 이름 (예: 음식점 > 한식 > 백반)
  category_group_code: string; // 주요 카테고리 코드 (FD6, CE7 등)
  category_group_name: string; // 주요 카테고리 이름 (음식점, 카페 등)
  phone: string; // 전화번호
  address_name: string; // 지번 주소
  road_address_name: string; // 도로명 주소
  x: string; // 경도 (longitude)
  y: string; // 위도 (latitude)
  place_url: string; // 장소 상세페이지 URL
  distance?: string; // 중심좌표 기준 거리 (미터 단위, 옵션)
  dt_cm_cd: string;
}
