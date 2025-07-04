import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "@/components/molecules/IconButton/IconButton";

interface MainHeaderProps {
  onSidebarOpen: () => void;
}

export default function MainHeader({ onSidebarOpen }: MainHeaderProps) {
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
          onSidebarOpen();
        }}
      />
    </header>
  );
}
