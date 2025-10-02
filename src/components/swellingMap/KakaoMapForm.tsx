import React, { useEffect, useRef } from "react";
import { useKakaoMap } from "@/hooks/useKakaoMap";

export default function KakaoMapForm() {
  const mapRef = useRef<HTMLDivElement>(null);
  const loaded = useKakaoMap();
  const markerRef = useRef<kakao.maps.Marker | null>(null); // 마커 저장용
  const markersRef = useRef<kakao.maps.Marker[]>([]); // 여러 개 마커 저장용
  const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null); // 현재 열린 InfoWindow 추적

  // 마커를 생성/이동하는 함수
  const placeMarker = (map: kakao.maps.Map, position: kakao.maps.LatLng) => {
    if (!markerRef.current) {
      // 처음 클릭 시 새 마커 생성
      markerRef.current = new window.kakao.maps.Marker({
        position,
        map,
      });
    } else {
      // 기존 마커가 있으면 위치만 이동
      markerRef.current.setPosition(position);
    }
  };

  // 마커 추가 함수
  const addMarker = (map: kakao.maps.Map, position: kakao.maps.LatLng) => {
    const marker = new window.kakao.maps.Marker({
      position,
      map,
    });

    // 마커 클릭 이벤트 → InfoWindow 제어
    window.kakao.maps.event.addListener(marker, "click", () => {
      // 기존 열린 InfoWindow 닫기
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }

      // 새로운 InfoWindow 생성
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px; font-size:13px;">
                    위도: ${position.getLat().toFixed(5)}<br/>
                    경도: ${position.getLng().toFixed(5)}
                  </div>`,
      });

      infoWindow.open(map, marker);
      infoWindowRef.current = infoWindow; // 현재 열린 InfoWindow 저장
    });

    markersRef.current.push(marker);
  };

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    console.log("KakaoMapForm loaded:::", loaded);

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울
        level: 3,
      });

      // 지도 클릭 이벤트 등록
      window.kakao.maps.event.addListener(
        map,
        "click",
        function (mouseEvent: any) {
          const latlng = mouseEvent.latLng;
          //placeMarker(map, latlng); // 함수 호출
          addMarker(map, latlng);
        }
      );
    });
  }, [loaded]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
