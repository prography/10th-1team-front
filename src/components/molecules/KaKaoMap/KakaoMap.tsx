"use client";

import { useEffect, useRef, useCallback } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  level?: number;
  markerImage?: string;
  markerSize?: {
    width: number;
    height: number;
  };
  markerPosition?: {
    x: number;
    y: number;
  };
}

interface KakaoLatLng {
  lat: () => number;
  lng: () => number;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

interface KakaoMarkerOptions {
  position: KakaoLatLng;
  image?: KakaoMarkerImage;
}

interface KakaoMarkerImage {
  src: string;
  size: KakaoSize;
  options?: {
    offset: KakaoPoint;
  };
}

interface KakaoSize {
  width: number;
  height: number;
}

interface KakaoPoint {
  x: number;
  y: number;
}

interface KakaoMapType {
  maps: {
    load: (callback: () => void) => void;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
    Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
    MarkerImage: new (
      src: string | HTMLImageElement,
      size: KakaoSize,
      options?: { offset: KakaoPoint }
    ) => KakaoMarkerImage;
    Size: new (width: number, height: number) => KakaoSize;
    Point: new (x: number, y: number) => KakaoPoint;
  };
}

interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
  setLevel: (level: number) => void;
}

interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (position: KakaoLatLng) => void;
}

declare global {
  interface Window {
    kakao: KakaoMapType;
  }
}

export default function KakaoMap({
  latitude,
  longitude,
  level = 3,
  markerImage,
  markerSize,
  markerPosition,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<KakaoMarker | null>(null);

  const createMarker = useCallback(
    (map: KakaoMap) => {
      if (markerImage && markerSize) {
        const imageSize = new window.kakao.maps.Size(
          markerSize.width,
          markerSize.height
        );
        const imageOptions = markerPosition
          ? {
              offset: new window.kakao.maps.Point(
                markerPosition.x,
                markerPosition.y
              ),
            }
          : undefined;

        const markerImageObj = new window.kakao.maps.MarkerImage(
          markerImage,
          imageSize,
          imageOptions
        );

        markerRef.current = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latitude, longitude),
          image: markerImageObj,
        });
      } else {
        markerRef.current = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(latitude, longitude),
        });
      }

      markerRef.current.setMap(map);
    },
    [latitude, longitude, markerImage, markerSize, markerPosition]
  );

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: level,
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
    createMarker(map);
  }, [createMarker, latitude, longitude, level]);

  const loadKakaoMap = useCallback(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setTimeout(() => {
          initializeMap();
        }, 100);
      });
    } else {
      const checkKakaoMap = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            setTimeout(() => {
              initializeMap();
            }, 100);
          });
          clearInterval(checkKakaoMap);
        }
      }, 100);
    }
  }, [initializeMap]);

  useEffect(() => {
    loadKakaoMap();
  }, [loadKakaoMap]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "300px",
      }}
    />
  );
}
