import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";

export default function MainHeader() {
  return (
    <header className="flex justify-between items-center px-[16px] pt-[24px] pb-[12px]">
      <IconButton
        startIcon={<Icon icon="ServiceLogo" size={30} />}
        onClick={() => {
          /** TODO: 리프레시 필요 */
        }}
      />
      <IconButton
        startIcon={<Icon icon="Menu" size={24} />}
        onClick={() => {
          /** TODO: 사이드바 열기 */
        }}
      />
    </header>
  );
}
