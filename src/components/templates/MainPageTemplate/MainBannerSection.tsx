interface MainBannerSectionProps {
  onClick: () => void;
}
export default function MainBannerSection({ onClick }: MainBannerSectionProps) {
  return (
    <div className="relative w-full px-[16px] py-[12px]">
      <div
        className="relative w-full h-full aspect-[326/184] bg-gray-200 rounded-[15px] overflow-hidden flex items-center justify-center"
        onClick={onClick}
      >
        <object
          data={"/images/MainBanner.svg"}
          type="image/svg+xml"
          className="w-[600px] h-full object-cover"
          aria-label="MainBanner"
        />
      </div>
    </div>
  );
}
