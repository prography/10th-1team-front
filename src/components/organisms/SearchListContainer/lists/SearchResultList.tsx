import List from "@/components/atoms/List/List";
import ListItem from "@/components/atoms/List/ListItem";
import StoreInfoCard from "../../StoreInfoCard/StoreInfoCard";
import type { SearchResultItem } from "@/types/search";
import EmptyPlaceholder from "@/components/molecules/EmptyPlaceholder/EmptyPlaceholder";

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
    <EmptyPlaceholder
      title="검색 결과가 없어요"
      description="매치하는 가게 정보가 없어요"
      className="py-[160px]"
    />
  );
}
