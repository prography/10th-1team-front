import Icon from "@/components/atoms/Icon/Icon";
import { List, ListItem } from "@/components/atoms/List";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { SavedPlacesInfo } from "@/types/activity";

interface SavedGroupDetailListProps {
  items: SavedPlacesInfo[];
  onItemClick: (item: SavedPlacesInfo) => void;
}

export default function SavedGroupDetailList({
  items,
  onItemClick,
}: SavedGroupDetailListProps) {
  return (
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
  );
}
