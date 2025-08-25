"use client";

import { useRouter } from "next/navigation";
import { colors } from "@/styles/colors";
import Icon from "@/components/atoms/Icon/Icon";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { ContextMenu } from "@/components/molecules/ContextMenu";
import { VotedActivityList } from "@/components/organisms/ActivityList";
import { useUserVotedActivityQuery } from "@/hooks/queries/useUserVotedActivityQuery";
import EmptyPlaceholder from "@/components/molecules/EmptyPlaceholder/EmptyPlaceholder";
import { useSort } from "@/hooks";
import { VotedActivityInfo } from "@/types/activity";
import { sortByDate } from "@/utils/sort";
import { useState } from "react";
import ActivityCalendar from "@/components/organisms/ActivityCalendar/ActivityCalendar";
import Divider from "@/components/atoms/Divider/Divider";
import { parseKoreanDateInfo } from "@/utils/date";

type SortType = "recent" | "old";

const SORT_LABELS: Record<SortType, string> = {
  recent: "최근 등록 순",
  old: "과거 등록 순",
};

const sorters = {
  recent: (arr: VotedActivityInfo[]) =>
    sortByDate(arr, (g) => g.voted_date, "desc"),
  old: (arr: VotedActivityInfo[]) =>
    sortByDate(arr, (g) => g.voted_date, "asc"),
} as const;

export default function VotedPageTemplate() {
  const router = useRouter();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data } = useUserVotedActivityQuery(year, month);

  const { sortKey, setSortKey, sortedItems } = useSort(
    data?.votes ?? [],
    sorters
  );

  const selectedInfo = selectedDate ? parseKoreanDateInfo(selectedDate) : null;
  const displayedCount = selectedInfo
    ? sortedItems.filter((item) => {
        const info = parseKoreanDateInfo(item.voted_date);
        return (
          info.year === selectedInfo.year &&
          info.month === selectedInfo.month &&
          info.date === selectedInfo.date
        );
      }).length
    : sortedItems.length;

  return (
    <div className="flex flex-col h-full w-full bg-surface-normal-container0 overflow-y-auto">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-surface-normal-container0">
        <DefaultHeader
          title="투표한 가게"
          startIcon={<Icon icon="Back" />}
          onClickStartIcon={() => router.push("/?sidebar=true")}
          fullWidth
          className="border-b border-border-normal-lowemp"
        />
        <ActivityCalendar
          year={year}
          month={month}
          votes={data?.votes ?? []}
          selectedDate={selectedDate}
          onChangeMonth={(year, month) => {
            setYear(year);
            setMonth(month);
            setSelectedDate(null);
          }}
          onDateClick={(date) => {
            setSelectedDate(date === selectedDate ? null : date);
          }}
        />

        <Divider />

        {/* 정렬기준 서브 헤더 */}
        <div className="flex justify-between items-center px-[16px] pt-[24px] pb-[12px]">
          <div className="body-m-semibold text-texticon-onnormal-highestemp space-x-[8px]">
            <span>전체</span>
            <span className="text-texticon-onnormal-main-500">
              {displayedCount}
            </span>
          </div>
          <ContextMenu
            align="right"
            offset={{ x: 0, y: 8 }}
            trigger={(props) => (
              <IconButton
                {...props}
                gap={4}
                text={SORT_LABELS[sortKey]}
                className="body-s-regular"
                endIcon={
                  <Icon
                    icon="Dropdown"
                    size={20}
                    fill={colors.TextIcon.OnNormal.LowestEmp}
                  />
                }
              />
            )}
            icon={<Icon icon="Check" size={20} />}
            items={[
              {
                label: SORT_LABELS.recent,
                onClick: () => setSortKey("recent"),
                selected: sortKey === "recent",
              },
              {
                label: SORT_LABELS.old,
                onClick: () => setSortKey("old"),
                selected: sortKey === "old",
              },
            ]}
          />
        </div>
      </div>

      {/* 저장 그룹 리스트 */}

      {sortedItems.length > 0 ? (
        <VotedActivityList
          items={sortedItems}
          onItemClick={(item) => router.push(`/place/${item.place_id}`)}
          selectedDate={selectedDate}
        />
      ) : (
        <EmptyPlaceholder
          title="투표 히스토리가 없어요"
          description="가게 상세페이지 > 플랫폼 매치에서 투표를 해보세요"
          className="my-[100px]"
        />
      )}
    </div>
  );
}
