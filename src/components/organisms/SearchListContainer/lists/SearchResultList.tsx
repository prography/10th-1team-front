import List from "@/components/atoms/List/List";
import ListItem from "@/components/atoms/List/ListItem";
import StoreInfoCard from "../../StoreInfoCard/StoreInfoCard";
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
          variant="default"
          as="li"
          onClick={() => onItemClick(item)}
        >
          <StoreInfoCard item={item} />
        </ListItem>
      ))}
    </List>
  );
}
