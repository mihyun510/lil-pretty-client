import { useEffect, useRef } from "react";
import { useKakaoMap } from "@/hooks/useKakaoMap";
import { KakaoMapPlacesItems } from "@/api/interfaces/KakaoMapPlaces";

interface KakaoMapFormProps {
  kakaoMapPlaces?: KakaoMapPlacesItems[]; // useParams에서 undefined 가능성 때문에 optional 처리
}

export default function KakaoMapForm({ kakaoMapPlaces }: KakaoMapFormProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const loaded = useKakaoMap();
  const markersRef = useRef<kakao.maps.Marker[]>([]); // 여러 개 마커 저장용
  const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null); // 현재 열린 InfoWindow 추적

  // 기존 마커 초기화 함수
  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  // 카카오 API 호출 (좌표 기반 장소 검색)
  const searchPlacesByKeyword = async (map: kakao.maps.Map) => {
    if (!kakaoMapPlaces) return;
    try {
      // 기존 마커 제거
      clearMarkers();
      // 결과 마커 추가
      kakaoMapPlaces.map((place: any) => {
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position,
          map,
        });

        // 마커 클릭 시 InfoWindow 표시
        window.kakao.maps.event.addListener(marker, "click", () => {
          if (infoWindowRef.current) infoWindowRef.current.close();

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px; font-size:13px; max-width:200px;">
                        <strong>${place.place_name}</strong><br/>
                        ${place.road_address_name || place.address_name}<br/>
                        ${place.phone || ""}
                        <br/><a href="${
                          place.place_url
                        }" target="_blank">상세보기</a>
                      </div>`,
          });

          infoWindow.open(map, marker);
          infoWindowRef.current = infoWindow;
        });

        markersRef.current.push(marker);
      });

      // 검색된 첫 번째 장소로 지도 이동
      if (kakaoMapPlaces.length > 0) {
        map.setCenter(
          new window.kakao.maps.LatLng(kakaoMapPlaces[0].y, kakaoMapPlaces[0].x)
        );
      }
    } catch (error) {
      console.error("카카오 장소 검색 오류:", error);
    }
  };

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
        level: 3,
      });

      //초기 검색
      searchPlacesByKeyword(map);
    });
  }, [loaded, kakaoMapPlaces]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
