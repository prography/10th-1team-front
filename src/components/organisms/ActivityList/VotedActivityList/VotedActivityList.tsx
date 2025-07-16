import { List, ListItem } from "@/components/atoms/List";
import { cn } from "@/utils/cn";
import { VotedActivityInfo } from "@/types/activity";
import Icon from "@/components/atoms/Icon/Icon";
import { colors } from "@/styles/colors";

interface VotedActivityListProps {
  items: VotedActivityInfo[];
  onItemClick: (item: VotedActivityInfo) => void;
}

export default function VotedActivityList({
  items,
  onItemClick,
}: VotedActivityListProps) {
  return (
    <List className="flex flex-col pb-[100px] w-full overflow-x-hidden">
      {items.map((item) => (
        <ListItem
          key={item.place_id}
          className="h-[138px] flex-row px-[16px] py-[12px] justify-start gap-[16px]"
          onClick={() => onItemClick(item)}
        >
          <div className="relative h-full aspect-[60/138] bg-surface-normal-container-b10 rounded-[4px] body-m-semibold flex flex-col items-center justify-center">
            {/* TODO: 투표 날짜 표시 필요 */}
            <p className="text-texticon-onnormal-highestemp">18</p>
            <p className="text-texticon-onnormal-lowestemp">토</p>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
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
                  item.platform === "naver"
                    ? "text-brand-naver-main"
                    : "text-brand-kakao-blue"
                )}
              >
                {item.platform === "naver" ? "네이버" : "카카오"}
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
                  className="flex items-center gap-[4px] px-[8px] py-[2px] rounded-[2px] caption-s-regular text-texticon-onnormal-main-500 bg-surface-normal-container-b50"
                >
                  <span>{reason}</span>
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
      ))}
    </List>
  );
}
