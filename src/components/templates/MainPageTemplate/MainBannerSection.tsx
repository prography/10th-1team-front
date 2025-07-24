import Image from "next/image";

interface MainBannerSectionProps {
  onClick: () => void;
}

export default function MainBannerSection({ onClick }: MainBannerSectionProps) {
  return (
    <div className="relative w-full px-[16px] py-[12px]">
      <div
        className="relative w-full h-full aspect-[326/184] bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <Image
          src={"/images/MainBanner.svg"}
          alt={"MainBanner"}
          fill
          sizes="600px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
