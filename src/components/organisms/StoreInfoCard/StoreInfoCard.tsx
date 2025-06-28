import Image from "next/image";
import type { SearchResultItem } from "@/types/search";
import PlatformScoreLabel from "./PlatformScoreLabel";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

interface StoreInfoCardProps {
  item: SearchResultItem;
  className?: string;
}

export default function StoreInfoCard({ item, className }: StoreInfoCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/place/${item.id}`);
  };

  return (
    <div
      className={cn(
        "flex-1 px-[16px] py-[12px] bg-surface-normal-bg01 cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-[16px] mb-[4px]">
        <span className="body-l-semibold text-texticon-onnormal-highestemp">
          {item.name}
        </span>
        <span className="caption-m-semibold text-texticon-onnormal-lowemp">
          {item.category}
        </span>
      </div>
      <div className="caption-m-regular text-texticon-onnormal-midemp mb-[12px]">
        {item.road_addresses ?? "주소 없음"}
        {item.region?.dong_name ?? "--"}
      </div>
      <div className="flex items-center gap-[8px] mb-[12px]">
        <PlatformScoreLabel
          platform="카카오"
          score={item.kakao.score}
          count={item.kakao.count}
        />
        <PlatformScoreLabel
          platform="네이버"
          score={item.naver.score}
          count={item.naver.count}
        />
      </div>

      <div className="relative w-full aspect-[328/160] bg-gray-100 rounded-[4px] overflow-hidden">
        <Image
          src={
            item.image_url && item.image_url !== ""
              ? item.image_url
              : "/images/fallback.png"
          }
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
