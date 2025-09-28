// src/hooks/useKakaoMap.ts
import { useEffect, useState } from "react";

export function useKakaoMap() {
  const [loaded, setLoaded] = useState(false);

  console.log("useKakaoMap key:::", import.meta.env.VITE_KAKAO_MAP_API_KEY);

  useEffect(() => {
    // 이미 로드되어 있으면 바로 true
    if (window.kakao) {
      console.log("useKakaoMap loaded:::", loaded);
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false`;
    console.log(script.src);
    script.async = true;
    script.onload = () => {
      console.log("Kakao SDK 로드 완료");
      setLoaded(true);
    };
    document.head.appendChild(script);
  }, []);
  console.log("useKakaoMap loaded:11::", loaded);
  return loaded;
}
