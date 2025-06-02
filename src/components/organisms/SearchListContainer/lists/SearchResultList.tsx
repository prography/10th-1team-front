import Icon from "@/components/atoms/Icon/Icon";
import List from "@/components/atoms/List/List";
import ListItem from "@/components/atoms/List/ListItem";
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
              {item.road_addresses} · {item.region.dong_name}
            </div>

            <div className="w-full aspect-[328/160] bg-gray-100 rounded-[4px] overflow-hidden">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex items-center gap-2 mt-[12px]">
              <div className="flex-1 flex items-center gap-[8px] bg-surface-normal-container-b50 rounded-[4px] p-[12px]">
                <Icon icon="Navermap" size={36} />
                <div>
                  <span className="caption-m-semibold mr-[2px]">
                    네이버 지도
                  </span>
                  <span className="caption-s-regular">
                    ({item.naver.count})
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon icon="Star" size={16} />
                    <span className="text-red-star caption-m-regular">
                      {item.naver.score ? item.naver.score : "--"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-[8px] bg-surface-normal-container-b50 rounded-[4px] p-[12px]">
                <Icon icon="Kakaomap" size={36} />
                <div>
                  <span className="caption-m-semibold mr-[2px]">카카오 맵</span>
                  <span className="caption-s-regular">
                    ({item.kakao.count})
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon icon="Star" size={16} />
                    <span className="text-red-star caption-m-regular">
                      {item.kakao.score ? item.kakao.score : "--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
