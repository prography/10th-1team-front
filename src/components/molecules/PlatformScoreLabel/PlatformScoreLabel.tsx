import { cn } from "@/utils/cn";
import Icon from "@/components/atoms/Icon/Icon";
import { colors } from "@/styles/colors";

interface PlatformScoreLabelProps {
  platform: "네이버" | "카카오";
  score: number;
  count: number;
}

export default function PlatformScoreLabel({
  platform,
  score,
  count,
}: PlatformScoreLabelProps) {
  return (
    <div className="w-fit flex items-center rounded-[4px] py-[4px] px-[8px] border-[0.5px] border-border-normal-lowemp">
      <span
        className={cn(
          "caption-m-semibold",
          platform === "네이버" && "text-brand-naver-main",
          platform === "카카오" && "text-brand-kakao-blue"
        )}
      >
        {platform}
      </span>
      <div className="flex items-center">
        <Icon icon="Star" size={16} fill={colors.TextIcon.OnNormal.HighEmp} />
        <span className="text-texticon-onnormal-highemp caption-m-semibold">
          {!score ? "--" : score}
        </span>
      </div>
      <span className="caption-s-regular ml-[2.5px] text-texticon-onnormal-lowemp">
        ({count})
      </span>
    </div>
  );
}
