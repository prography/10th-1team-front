import HighlightQuery from "@/components/atoms/HighlightQuery/HighlightQuery";
import List from "@/components/atoms/List/List";
import ListItem from "@/components/atoms/List/ListItem";
import type { AutoCompleteItem } from "@/types/search";

interface SearchAutoCompleteListProps {
  items: AutoCompleteItem[];
  query: string;
  onItemClick: (item: AutoCompleteItem) => void;
}

export default function SearchAutoCompleteList({
  items,
  query,
  onItemClick,
}: SearchAutoCompleteListProps) {
  return (
    <List as="ul">
      {items.map((item) => (
        <ListItem
          key={item.id}
          variant="auto-complete"
          onClick={() => onItemClick(item)}
          as="li"
        >
          <div className="flex items-center gap-4">
            <HighlightQuery text={item.name} query={query} />
            <span className="caption-m-semibold text-texticon-onnormal-lowemp">
              {item.category}
            </span>
          </div>
          <div className="caption-m-regular text-texticon-onnormal-midemp">
            {item.road_addresses} · {item.region.dong_name}
          </div>
        </ListItem>
      ))}
    </List>
  );
}
