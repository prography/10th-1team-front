import React from "react";
import { List, ListItem } from "@/components/atoms/List";

export default function GroupSaveModalSkeleton() {
  return (
    <div>
      {/* 그룹 목록 스켈레톤 */}
      <List as="ul" className="flex flex-col h-[168px] overflow-y-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <ListItem
            as="li"
            key={index}
            variant="place-save"
            className="flex items-center justify-between p-[16px]"
          >
            <div className="flex items-center gap-[8px]">
              {/* 그룹 아이콘 스켈레톤 */}
              <div className="w-[24px] h-[24px] bg-surface-normal-container-b50 rounded-[4px] animate-pulse" />

              {/* 그룹명과 북마크 수 스켈레톤 */}
              <div className="flex items-center gap-[8px]">
                <div className="h-[14px] w-[100px] bg-surface-normal-container-b50 rounded-[4px] animate-pulse" />
                <div className="h-[10px] w-[30px] bg-surface-normal-container-b50 rounded-[4px] animate-pulse" />
              </div>
            </div>

            {/* 우측 영역 스켈레톤 */}
            <div className="flex justify-center items-center gap-[5px]">
              <div className="w-[20px] h-[20px] bg-surface-normal-container-b50 rounded-[4px] animate-pulse" />
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
