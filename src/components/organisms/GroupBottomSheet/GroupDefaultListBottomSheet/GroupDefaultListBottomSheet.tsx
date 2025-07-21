import { useState } from "react";

import type { GroupInfo } from "@/types/activity";
import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";
import { List, ListItem } from "@/components/atoms/List";
import Icon from "@/components/atoms/Icon/Icon";
import Button from "@/components/atoms/Button/Button";
import { cn } from "@/utils/cn";

interface GroupDefaultListBottomSheetProps {
  title: string;
  groups: GroupInfo[];
  onClose: () => void;
  onSelectGroup?: (group: GroupInfo) => void;
  onDone: (selectedGroupId: string) => void;
}

export default function GroupDefaultListBottomSheet({
  title,
  groups,
  onClose,
  onDone,
}: GroupDefaultListBottomSheetProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <BottomSheet title={title} onClose={onClose}>
      <List as="ul" className="flex flex-col h-[168px] overflow-y-auto">
        {groups?.map((group: GroupInfo) => (
          <ListItem
            as="li"
            key={group.group_id}
            variant="place-save"
            className={cn(
              "flex items-center justify-between p-[16px] cursor-pointer",
              selectedGroup === group.group_id &&
                "bg-surface-normal-container-b50"
            )}
            onClick={() => setSelectedGroup(group.group_id)}
          >
            <div className="flex items-center gap-[8px]">
              <Icon icon="Group" size={24} fill={group.icon} />
              <span
                className={cn(
                  "body-s-semibold md:max-w-none max-w-[200px] inline-block align-middle leading-none overflow-hidden text-ellipsis whitespace-nowrap",
                  selectedGroup === group.group_id &&
                    "text-texticon-onnormal-main-500"
                )}
              >
                {group.group_name}
              </span>
              <span
                className={cn(
                  "caption-m-regular inline-block align-middle leading-none",
                  selectedGroup === group.group_id &&
                    "text-texticon-onnormal-main-500"
                )}
              >
                {group.number_of_bookmark}
              </span>
            </div>
            <div className="flex justify-center items-center gap-[5px]">
              {selectedGroup === group.group_id && (
                <Icon icon="Check" size={20} fill={group.icon} />
              )}
            </div>
          </ListItem>
        ))}
      </List>

      {/* 완료 버튼 */}
      <div className="px-[16px] py-[14px] mb-[24px]">
        <Button
          variant="primary"
          fullWidth
          className="h-[56px]"
          disabled={!selectedGroup}
          onClick={() => selectedGroup && onDone(selectedGroup)}
        >
          완료
        </Button>
      </div>
    </BottomSheet>
  );
}
