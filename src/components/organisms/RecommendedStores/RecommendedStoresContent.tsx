import StoreInfoCard from "@/components/organisms/StoreInfoCard/StoreInfoCard";
import type { SearchResultItem } from "@/types/search";

const dummyStores: SearchResultItem[] = [
  {
    id: "농민백암순대_강남직영점@서울_강남구_역삼로3길_20-4",
    addresses: "서울 강남구 역삼동 830-9",
    road_addresses: "서울 강남구 역삼로3길 20-4",
    region: {
      dong_name: "법정동 이름",
      dong_code: "1168010100",
    },
    category: "한식",
    name: "농민백암순대 강남직영점",
    image_url:
      "https://ldb-phinf.pstatic.net/20220823_198/1661219525050UCnxb_JPEG/0AA61948-38FC-4DF6-804E-8A12DD6E96A3.jpeg",
    kakao: {
      count: 496,
      score: 4.6,
      processed: true,
    },
    naver: {
      count: 3009,
      score: 4.51,
      processed: true,
    },
  },
  {
    id: "나이스샤워_선릉역점@서울_강남구_선릉로86길_26",
    addresses: "서울 강남구 대치동 896-7",
    road_addresses: "서울 강남구 선릉로86길 26",
    region: {
      dong_name: "법정동 이름",
      dong_code: "1168010600",
    },
    category: "일식",
    name: "나이스샤워 선릉역점",
    image_url:
      "https://ldb-phinf.pstatic.net/20250428_182/1745829625058HWFDC_JPEG/KakaoTalk_20250428_173856176_01.jpg",
    kakao: {
      count: 27,
      score: 3.4,
      processed: true,
    },
    naver: {
      count: 1229,
      score: 0,
      processed: true,
    },
  },
  {
    id: "동래정_선릉직영점@서울_강남구_언주로98길_20",
    addresses: "서울 강남구 역삼동 700-29",
    road_addresses: "서울 강남구 언주로98길 20",
    region: {
      dong_name: "법정동 이름",
      dong_code: "1168010100",
    },
    category: "한식",
    name: "동래정 선릉직영점",
    image_url:
      "https://ldb-phinf.pstatic.net/20250126_148/1737855350169ayTT4_JPEG/KakaoTalk_20250124_185124961_01.jpg",
    kakao: {
      count: 78,
      score: 4.7,
      processed: true,
    },
    naver: {
      count: 597,
      score: 4.93,
      processed: true,
    },
  },
];

export default function RecommendedStoresContent() {
  return (
    <div className="flex flex-col gap-[12px]">
      {dummyStores.map((store) => (
        <StoreInfoCard
          key={store.id}
          item={store}
          className="rounded-[8px] border border-border-normal-lowemp"
        />
      ))}
    </div>
  );
}
