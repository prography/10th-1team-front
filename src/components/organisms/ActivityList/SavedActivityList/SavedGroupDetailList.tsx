import Icon from "@/components/atoms/Icon/Icon";
import { List, ListItem } from "@/components/atoms/List";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { PlaceInfo } from "@/types/activity";
import EmptyPlaceholder from "@/components/molecules/EmptyPlaceholder/EmptyPlaceholder";
import { colors } from "@/styles/colors";
import Divider from "@/components/atoms/Divider/Divider";

interface SavedGroupDetailListProps {
  items: PlaceInfo[];
  selectedItems: string[];
  isEditMode: boolean;
  onItemClick: (item: PlaceInfo) => void;
  onDeleteClick: (item: PlaceInfo) => void;
}

export default function SavedGroupDetailList({
  items,
  selectedItems,
  isEditMode,
  onItemClick,
  onDeleteClick,
}: SavedGroupDetailListProps) {
  return items.length > 0 ? (
    <List className="flex flex-col pb-[100px]">
      {items.map((item) => {
        const isSelected = selectedItems.includes(item.place_id);

        return (
          <div key={item.place_id} className="flex flex-col justify-center">
            <ListItem
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
                          isSelected
                            ? colors.TextIcon.OnNormal.White
                            : undefined
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
                    <IconButton
                      {...props}
                      startIcon={<Icon icon="More" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (props.onClick) props.onClick(e);
                      }}
                    />
                  )}
                  className="w-[130px]"
                  icon={<Icon icon="Check" size={20} />}
                  items={[
                    {
                      label: "삭제",
                      onClick: () => {
                        onDeleteClick(item);
                      },
                    },
                    {
                      label: "룰렛 추가",
                      onClick: () => alert("룰렛 추가"),
                    },
                  ]}
                />
              )}
            </ListItem>
            <Divider
              thickness={0.5}
              className="bg-border-normal-lowestemp w-[calc(100%-32px)] mx-auto"
            />
          </div>
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
