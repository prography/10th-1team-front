import Icon from "@/components/atoms/Icon/Icon";
import { List, ListItem } from "@/components/atoms/List";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { PlaceInfo } from "@/types/activity";
import EmptyPlaceholder from "@/components/molecules/EmptyPlaceholder/EmptyPlaceholder";
import { colors } from "@/styles/colors";

interface SavedGroupDetailListProps {
  items: PlaceInfo[];
  selectedItems: PlaceInfo[];
  isEditMode: boolean;
  onItemClick: (item: PlaceInfo) => void;
}

export default function SavedGroupDetailList({
  items,
  selectedItems,
  isEditMode,
  onItemClick,
}: SavedGroupDetailListProps) {
  return items.length > 0 ? (
    <List className="flex flex-col pb-[100px]">
      {items.map((item) => {
        const isSelected = selectedItems.some(
          (i) => i.place_id === item.place_id
        );

        return (
          <ListItem
            key={item.place_id}
            variant="saved-group-detail"
            as="li"
            onClick={() => {
              if (!isEditMode) onItemClick(item);
            }}
          >
            <div className="flex gap-[16px] items-center">
              {isEditMode && (
                <IconButton
                  startIcon={
                    <Icon
                      icon="Radio"
                      fill={
                        isSelected
                          ? colors.TextIcon.OnNormal["Main 500"]
                          : undefined
                      }
                      stroke={
                        isSelected ? colors.TextIcon.OnNormal.White : undefined
                      }
                    />
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemClick(item);
                  }}
                />
              )}

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
            </div>

            {!isEditMode && (
              <ContextMenu
                align="right"
                offset={{ x: 0, y: 0.5 }}
                trigger={(props) => (
                  <IconButton {...props} startIcon={<Icon icon="More" />} />
                )}
                className="w-[120px]"
                icon={<Icon icon="Check" size={20} />}
                items={[
                  {
                    label: "삭제",
                    onClick: () => alert("삭제"),
                  },
                  {
                    label: "룰렛 추가",
                    onClick: () => alert("룰렛 추가"),
                  },
                ]}
              />
            )}
          </ListItem>
        );
      })}
    </List>
  ) : (
    <EmptyPlaceholder
      title="저장된 가게가 없어요"
      description="가게 상세페이지 > ‘저장' 으로 가게를 저장해보세요"
      className="py-[100px]"
    />
  );
}
