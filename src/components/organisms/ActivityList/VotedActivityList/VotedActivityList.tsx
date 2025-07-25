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
}: VotedActivityListProps) {
  const grouped = groupByYearMonth(items);
  return (
    <List className="flex flex-col pb-[100px] w-full overflow-x-hidden">
      {Object.entries(grouped).map(([yearMonth, groupItems]) => {
        const [year, month] = yearMonth.split("-");
        return (
          <div key={yearMonth}>
            <div className="caption-m-semibold text-texticon-onnormal-midemp px-[16px] py-[4px]">
              {year}년 {month}월
            </div>
            {groupItems.map((item, index) => {
              const dateInfo = parseKoreanDateInfo(item.voted_date);
              const isToday = dateInfo.isToday && index === 0;
              return (
                <ListItem
                  key={item.place_id}
                  className="h-full flex-row px-[16px] py-[12px] justify-start gap-[16px]"
                  onClick={() => onItemClick(item)}
                >
                  <div
                    className={cn(
                      "relative flex-shrink-0 w-[60px] h-[138px] bg-surface-normal-container-b10 rounded-[8px] body-m-semibold flex flex-col items-center justify-center",
                      isToday && "border border-border-primary-500"
                    )}
                  >
                    <p
                      className={cn(
                        "text-texticon-onnormal-highestemp",
                        isToday && "text-brand-primary-main"
                      )}
                    >
                      {dateInfo.date}
                    </p>
                    <p
                      className={cn(
                        "text-texticon-onnormal-lowestemp",
                        isToday && "text-brand-primary-main"
                      )}
                    >
                      {dateInfo.day[0]}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between py-[12px] w-full">
                    <p className="caption-m-semibold text-texticon-onnormal-lowemp">
                      {item.category}
                    </p>
                    <p className="body-m-semibold text-texticon-onnormal-highestemp">
                      {item.place_name}
                    </p>

                    {/* TODO: 라벨 컴포넌트 분리 필요 */}
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

                    {/* TODO: 라벨 컴포넌트 분리 필요 */}
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
