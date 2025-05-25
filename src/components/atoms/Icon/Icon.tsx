import * as icons from "./icons";

export type IconName = keyof typeof icons;

interface IconProps {
  icon: IconName;
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

export default function Icon({
  icon,
  size = 24,
  fill,
  stroke,
  strokeWidth,
  className,
}: IconProps) {
  const IconComponent = icons[icon];
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
}
