import * as icons from "./icons";

export type IconName = keyof typeof icons;

interface IconProps {
  icon: IconName;
  size?: number;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({
  icon,
  size = 24,
  color,
  fill,
  stroke,
  strokeWidth,
  className,
  style,
}: IconProps) {
  const IconComponent = icons[icon];
  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      style={{ color, fill, stroke, strokeWidth, ...style }}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}
