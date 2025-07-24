import regionsData from "@/constants/regions.json";
import type { DongInfo } from "@/types/region";

interface RegionData {
  [key: string]: Array<{
    name: string;
    dong_code: string;
  }>;
}

/**
 * 특정 구의 동 리스트를 반환합니다.
 * @param city 구 이름 (예: "강남구")
 * @returns DongInfo[] 동 리스트
 */
export function getDongListByCity(city: string): DongInfo[] {
  const regionData = regionsData as RegionData;
  const dongList = regionData[city];

  if (!dongList) {
    return [];
  }

  return dongList.map((dong) => ({
    name: dong.name,
    dong_code: dong.dong_code,
  }));
}

/**
 * 사용 가능한 모든 구 목록을 반환합니다.
 * @returns string[] 구 목록
 */
export function getAvailableCities(): string[] {
  const regionData = regionsData as RegionData;
  return Object.keys(regionData);
}

/**
 * 동이름으로 해당하는 동의 동코드와 이름을 반환합니다.
 * @param dongName 동 이름 (예: "역삼동")
 * @returns {dong_code: string, name: string} | null 동코드와 이름이 포함된 객체 또는 null
 */
export function getDongInfoByName(
  dongName: string
): { dong_code: string; name: string } | null {
  const regionData = regionsData as RegionData;

  // 모든 구를 순회하면서 해당 동이름을 찾습니다
  for (const city in regionData) {
    const dongList = regionData[city];
    const foundDong = dongList.find((dong) => dong.name === dongName);

    if (foundDong) {
      return {
        dong_code: foundDong.dong_code,
        name: foundDong.name,
      };
    }
  }

  return null;
}
