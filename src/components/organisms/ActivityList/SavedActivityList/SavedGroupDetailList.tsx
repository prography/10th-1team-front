import Icon from "@/components/atoms/Icon/Icon";
import { List, ListItem } from "@/components/atoms/List";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { PlaceInfo } from "@/types/activity";
import EmptyPlaceholder from "@/components/molecules/EmptyPlaceholder/EmptyPlaceholder";

interface SavedGroupDetailListProps {
  items: PlaceInfo[];
  onItemClick: (item: PlaceInfo) => void;
}

export default function SavedGroupDetailList({
  items,
  onItemClick,
}: SavedGroupDetailListProps) {
  return items.length > 0 ? (
    <List className="flex flex-col pb-[100px]">
      {items.map((item) => (
        <ListItem
          key={item.place_id}
          variant="auto-complete"
          className="flex-row"
          onClick={() => onItemClick(item)}
          as="li"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="body-m-semibold text-texticon-onnormal-highestemp">
                {item.place_name}
              </span>
              <span className="caption-m-semibold text-texticon-onnormal-lowemp">
                {item.category}
              </span>
            </div>
            <div className="caption-m-regular text-texticon-onnormal-midemp">
              {item.road_address}
            </div>
          </div>

          <ContextMenu
            align="right"
            offset={{ x: 0, y: 0.5 }}
            trigger={(props) => (
              <IconButton {...props} startIcon={<Icon icon="More" />} />
            )}
            className="w-[120px]"
            icon={<Icon icon="Check" size={20} />}
            items={[
              // TODO: 동작 추가 필요
              {
                label: "수정",
                onClick: () => alert("수정"),
              },
              {
                label: "룰렛 추가",
                onClick: () => alert("룰렛 추가"),
              },
            ]}
          />
        </ListItem>
      ))}
    </List>
  ) : (
    <EmptyPlaceholder
      title="저장된 가게가 없어요"
      description="가게 상세페이지 > ‘저장' 으로 가게를 저장해보세요"
      className="py-[100px]"
    />
  );
}
