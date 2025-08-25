import { List, ListItem } from "@/components/atoms/List";
import { cn } from "@/utils/cn";
import { VotedActivityInfo } from "@/types/activity";
import Icon from "@/components/atoms/Icon/Icon";
import { colors } from "@/styles/colors";
import { REASON_LABELS } from "@/types/platformMatch";
import { parseKoreanDateInfo } from "@/utils/date";

interface VotedActivityListProps {
  items: VotedActivityInfo[];
  onItemClick: (item: VotedActivityInfo) => void;
  selectedDate: string | null;
}

function groupByYearMonth(items: VotedActivityInfo[]) {
  const grouped: Record<string, VotedActivityInfo[]> = {};
  items.forEach((item) => {
    const { year, month } = parseKoreanDateInfo(item.voted_date);
    const key = `${year}-${month}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });
  return grouped;
}

export default function VotedActivityList({
  items,
  onItemClick,
  selectedDate,
}: VotedActivityListProps) {
  const selectedDateInfo = selectedDate
    ? parseKoreanDateInfo(selectedDate)
    : null;

  const filteredItems = selectedDateInfo
    ? items.filter((item) => {
        const info = parseKoreanDateInfo(item.voted_date);
        return (
          info.year === selectedDateInfo.year &&
          info.month === selectedDateInfo.month &&
          info.date === selectedDateInfo.date
        );
      })
    : items;

  const grouped = groupByYearMonth(filteredItems);

  return (
    <List className="flex flex-col pb-[100px] w-full overflow-x-hidden">
      {Object.entries(grouped).map(([yearMonth, groupItems]) => {
        const [year, month] = yearMonth.split("-");

        const selectedIndex = selectedDateInfo
          ? groupItems.findIndex((item) => {
              const dateInfo = parseKoreanDateInfo(item.voted_date);
              return (
                selectedDateInfo.year === dateInfo.year &&
                selectedDateInfo.month === dateInfo.month &&
                selectedDateInfo.date === dateInfo.date
              );
            })
          : -1;

        const parsedItems = groupItems.map((item) => ({
          ...item,
          dateInfo: parseKoreanDateInfo(item.voted_date),
        }));

        return (
          <div key={yearMonth}>
            <div className="caption-m-semibold text-texticon-onnormal-midemp px-[16px] py-[4px]">
              {year}년 {month}월
            </div>
            {parsedItems.map((item, index) => {
              // 날짜별로 그룹화
              const isFirstOfDate =
                index === 0 ||
                item.dateInfo.date !== parsedItems[index - 1].dateInfo.date;

              const isSelected = selectedIndex === index;
              const isTodayFirstOfDate = item.dateInfo.isToday && isFirstOfDate;
              const isSelectedFirstOfDate = isSelected && isFirstOfDate;

              return (
                <ListItem
                  key={item.place_id}
                  className="h-full flex-row px-[16px] py-[12px] justify-start gap-[16px]"
                  onClick={() => onItemClick(item)}
                >
                  <div
                    className={cn(
                      "relative flex-shrink-0 w-[60px] h-[138px] rounded-[8px] body-m-semibold flex flex-col items-center justify-center",
                      isFirstOfDate && "bg-surface-normal-container-b10",
                      isSelectedFirstOfDate && "bg-texticon-onnormal-black",
                      !isSelectedFirstOfDate &&
                        isTodayFirstOfDate &&
                        "border border-border-primary-500"
                    )}
                  >
                    {isFirstOfDate && (
                      <>
                        <p
                          className={cn(
                            "text-texticon-onnormal-highestemp",
                            isSelectedFirstOfDate
                              ? "text-texticon-onnormal-white"
                              : isTodayFirstOfDate
                                ? "text-brand-primary-main"
                                : "text-texticon-onnormal-highestemp"
                          )}
                        >
                          {item.dateInfo.date}
                        </p>
                        <p
                          className={cn(
                            "text-texticon-onnormal-lowestemp",
                            !isSelectedFirstOfDate &&
                              isTodayFirstOfDate &&
                              "text-brand-primary-main"
                          )}
                        >
                          {item.dateInfo.day[0]}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col justify-between py-[12px] w-full">
                    <p className="caption-m-semibold text-texticon-onnormal-lowemp">
                      {item.category}
                    </p>
                    <p className="body-m-semibold text-texticon-onnormal-highestemp">
                      {item.place_name}
                    </p>

                    <p className="flex items-center w-fit gap-[2px] px-[8px] py-[2px] border border-border-normal-lowestemp rounded-[4px]">
                      <span
                        className={cn(
                          "caption-m-semibold",
                          item.platform === "NAVER"
                            ? "text-brand-naver-main"
                            : "text-brand-kakao-blue"
                        )}
                      >
                        {item.platform === "NAVER" ? "네이버" : "카카오"}
                      </span>
                      <span className="caption-s-regular text-texticon-onnormal-midemp">
                        에 투표했어요
                      </span>
                    </p>

                    <div className="flex gap-[8px] w-full overflow-x-auto scrollbar-hide pr-[80px]">
                      {item.reasons.map((reason, index) => (
                        <p
                          key={index}
                          className="flex items-center gap-[4px] px-[8px] py-[2px] rounded-[2px] caption-s-regular text-texticon-onnormal-main-500 bg-surface-normal-container-b50 whitespace-nowrap"
                        >
                          <span className="whitespace-nowrap">
                            {REASON_LABELS[reason]}
                          </span>
                          <Icon
                            icon="Check"
                            size={12}
                            stroke={colors.TextIcon.OnNormal["Main 500"]}
                          />
                        </p>
                      ))}
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </div>
        );
      })}
    </List>
  );
}
