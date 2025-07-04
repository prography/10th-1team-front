import * as icons from "./icons";
import React from "react";

export type IconName = keyof typeof icons;

interface IconProps {
  /** 사용할 아이콘의 이름 */
  icon: IconName;
  /** 아이콘의 크기 (픽셀 단위, 기본값: 24) */
  size?: number;
  /** 아이콘의 채우기 색상 */
  fill?: string;
  /** 아이콘의 테두리 색상 */
  stroke?: string;
  /** 아이콘의 테두리 두께 */
  strokeWidth?: number;
  /** 추가 스타일을 적용하기 위한 className */
  className?: string;
}

// 아이콘 컴포넌트를 미리 캐시하여 깜빡임 방지
const IconComponent = React.memo(function IconComponent({
  icon,
  size = 24,
  fill,
  stroke,
  strokeWidth,
  className,
}: IconProps) {
  const IconComponent = icons[icon];

  if (!IconComponent) {
    console.warn(`Icon component "${icon}" not found`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
});

export default IconComponent;
