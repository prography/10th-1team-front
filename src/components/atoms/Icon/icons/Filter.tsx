import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Filter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 7H16" stroke={props.stroke || colors.Brand.Primary.Main} />
      <circle
        cx="8"
        cy="7"
        r="1.5"
        fill={props.fill || colors.TextIcon.OnNormal.White}
        stroke={props.stroke || colors.Brand.Primary.Main}
      />
      <path d="M16 13H4" stroke={props.stroke || colors.Brand.Primary.Main} />
      <circle
        cx="2"
        cy="2"
        r="1.5"
        transform="matrix(-1 0 0 1 14 11)"
        fill={props.fill || colors.TextIcon.OnNormal.White}
        stroke={props.stroke || colors.Brand.Primary.Main}
      />
    </svg>
  );
}
