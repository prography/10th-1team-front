import Image from "next/image";
import List from "@/components/atoms/List/List";
import ListItem from "@/components/atoms/List/ListItem";
import MapScoreCard from "./MapScoreCard";

import type { SearchResultItem } from "@/types/search";

interface SearchResultListProps {
  items: SearchResultItem[];
  onItemClick: (item: SearchResultItem) => void;
}

export default function SearchResultList({
  items,
  onItemClick,
}: SearchResultListProps) {
  return (
    <List as="ul">
      {items.map((item) => (
        <ListItem
          key={item.id}
          variant="search-result"
          as="li"
          onClick={() => onItemClick(item)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-[16px] mb-[4px]">
              <span className="body-l-semibold text-texticon-onnormal-highestemp">
                {item.name}
              </span>
              <span className="caption-m-semibold text-texticon-onnormal-lowemp">
                {item.category}
              </span>
            </div>
            <div className="caption-m-regular text-texticon-onnormal-midemp mb-[12px]">
              {item.road_addresses ?? "주소 없음"}
              {" · "}
              {item.region?.dong_name ?? "--"}
            </div>

            <div className="relative w-full aspect-[328/160] bg-gray-100 rounded-[4px] overflow-hidden">
              <Image
                src={
                  item.image_url && item.image_url !== ""
                    ? item.image_url
                    : "/images/fallback.png"
                }
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mt-[12px]">
              <MapScoreCard
                icon="Navermap"
                label="네이버 지도"
                count={item.naver.count}
                score={item.naver.score}
              />
              <MapScoreCard
                icon="Kakaomap"
                label="카카오 맵"
                count={item.kakao.count}
                score={item.kakao.score}
              />
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
