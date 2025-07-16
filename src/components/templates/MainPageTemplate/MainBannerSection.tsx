import Image from "next/image";

export default function MainBannerSection() {
  return (
    <div className="relative w-full px-[16px] py-[12px]">
      <div className="relative w-full h-full aspect-[326/184] bg-gray-200 rounded-lg overflow-hidden">
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
