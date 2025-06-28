import List from "@/components/atoms/List/List";
import ListItem from "@/components/atoms/List/ListItem";
import StoreInfoCard from "../../StoreInfoCard/StoreInfoCard";
import type { SearchResultItem } from "@/types/search";
import Icon from "@/components/atoms/Icon/Icon";

interface SearchResultListProps {
  items: SearchResultItem[];
  onItemClick: (item: SearchResultItem) => void;
}

export default function SearchResultList({
  items,
  onItemClick,
}: SearchResultListProps) {
  return items.length > 0 ? (
    <List as="ul">
      {items.map((item) => (
        <ListItem
          key={item.id}
          variant="default"
          as="li"
          onClick={() => onItemClick(item)}
        >
          <StoreInfoCard item={item} />
        </ListItem>
      ))}
    </List>
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <Icon icon="BrandNaver" size={40} />
      <span className="body-m-semibold text-texticon-onnormal-highestemp">
        검색 결과가 없습니다.
      </span>
      <span className="caption-m-regular text-texticon-onnormal-midemp">
        매치하는 가게 정보가 없어요
      </span>
    </div>
  );
}
