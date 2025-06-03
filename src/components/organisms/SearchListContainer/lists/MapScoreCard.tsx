import Icon from "@/components/atoms/Icon/Icon";

interface MapScoreCardProps {
  icon: "Navermap" | "Kakaomap";
  label: string;
  count: number;
  score: number | null;
}

export default function MapScoreCard({
  icon,
  label,
  count,
  score,
}: MapScoreCardProps) {
  return (
    <div className="flex-1 flex items-center gap-[8px] bg-surface-normal-container-b50 rounded-[4px] p-[12px]">
      <Icon icon={icon} size={36} />
      <div>
        <span className="caption-m-semibold mr-[2px]">{label}</span>
        <span className="caption-s-regular">({count})</span>
        <div className="flex items-center gap-1">
          <Icon icon="Star" size={16} />
          <span className="text-red-star caption-m-regular">
            {score ?? "--"}
          </span>
        </div>
      </div>
    </div>
  );
}
