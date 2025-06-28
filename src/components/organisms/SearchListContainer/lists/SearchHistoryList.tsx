import { List, ListItem } from "@/components/atoms/List";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";
import { SearchRecentItem } from "@/types/search";

interface SearchHistoryListProps {
  items: SearchRecentItem[];
  onDeleteItem: (id: string) => void;
  onItemClick: (item: SearchRecentItem) => void;
}

export default function SearchHistoryList({
  items,
  onDeleteItem,
  onItemClick,
}: SearchHistoryListProps) {
  return items.length > 0 ? (
    <List as="ul">
      {items.map((item) => (
        <ListItem
          key={item.id}
          variant="history-search"
          as="li"
          onClick={() => onItemClick(item)}
        >
          <span className="body-s-regular text-texticon-onnormal-highestemp">
            {item.query}
          </span>
          <IconButton
            startIcon={<Icon icon="Exit" size={20} strokeWidth={1} />}
            aria-label={`"${item.query}" 기록 삭제`}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteItem(item.id);
            }}
          />
        </ListItem>
      ))}
    </List>
  ) : (
    <div className="flex flex-col items-center justify-center h-[136px]">
      <span className="body-m-regular text-texticon-onnormal-midemp">
        최근 검색 내역이 없습니다
      </span>
    </div>
  );
}
