import React, { useEffect, useRef } from "react";
import { useKakaoMap } from "@/hooks/useKakaoMap";

export default function KakaoMapForm() {
  const mapRef = useRef<HTMLDivElement>(null);
  const loaded = useKakaoMap();

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    console.log("KakaoMapForm loaded:::", loaded);

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울
        level: 3,
      });
    });
  }, [loaded]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
