import Icon from "@/components/atoms/Icon/Icon";
import { List, ListItem } from "@/components/atoms/List";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { GroupInfo } from "@/types/activity";

interface SavedGroupListProps {
  items: GroupInfo[];
  onItemClick: (item: GroupInfo) => void;
}

export default function SavedGroupList({
  items,
  onItemClick,
}: SavedGroupListProps) {
  return (
    <List className="flex flex-col pb-[100px]">
      {items.map((item) => (
        <ListItem
          key={item.group_id}
          variant="saved-group"
          className="items-center"
          onClick={() => onItemClick(item)}
        >
          <div className="flex gap-[8px]">
            <Icon icon="Group" fill={item.icon} />

            <div className="flex flex-col gap-[12px]">
              <p className="body-s-semibold text-texticon-onnormal-highestemp">
                {item.group_name}
              </p>
              <p className="caption-m-regular space-x-[4px] text-texticon-onnormal-lowemp">
                <span>저장된 가게</span>
                <span className="caption-m-semibold">
                  {item.number_of_bookmark}
                </span>
              </p>
            </div>
          </div>

          <ContextMenu
            align="right"
            offset={{ x: 0, y: 16 }}
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
                label: "삭제",
                onClick: () => alert("삭제"),
              },
            ]}
          />
        </ListItem>
      ))}
    </List>
  );
}
