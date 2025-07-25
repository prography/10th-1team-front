import Icon from "@/components/atoms/Icon/Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-start bg-surface-normal-container0 px-[16px] pt-[28px] pb-[112px] gap-[20px] w-full">
      <Icon icon="ServiceLogo" size={24} />
      <div className="flex gap-[24px] text-texticon-onnormal-midemp caption-m-regular">
        {/* TODO: 기획 후 링크 추가 필요 */}
        <Link href="https://tattered-radius-4a3.notion.site/23ac0f5d7a1d8094a2c7ecf66ca05fe3">
          팀 소개
        </Link>
        <Link href="https://tattered-radius-4a3.notion.site/23ac0f5d7a1d80b79175c6bcde53f0a8">
          개인정보 처리 방침
        </Link>
        <Link href="https://tattered-radius-4a3.notion.site/23ac0f5d7a1d8091a5a8f68ebcaa89c7">
          이용약관
        </Link>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdqpnKaCNtRxQ4eHx35qoxJdFiJq-bTc5zlDlbmjFZr2oedUA/viewform">
          질문/건의
        </Link>
      </div>
    </div>
  );
}
