import Icon from "@/components/atoms/Icon/Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-start bg-surface-normal-container0 px-[16px] pt-[28px] pb-[112px] gap-[20px] w-full">
      <Icon icon="ServiceLogo" size={24} />
      <div className="flex gap-[24px] text-texticon-onnormal-midemp caption-m-regular">
        {/* TODO: 기획 후 링크 추가 필요 */}
        <Link href="/">팀 소개</Link>
        <Link href="/">개인정보취급방침</Link>
        <Link href="/">이용약관</Link>
        <Link href="/">질문/건의</Link>
      </div>
    </div>
  );
}
