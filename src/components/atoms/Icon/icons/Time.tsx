import { SVGProps } from "react";
import { colors } from "@/styles/colors";

export default function Time(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="7"
        fill={props.fill || colors.TextIcon.OnNormal.LowestEmp}
      />
      <path
        d="M10 7V10L12.5 11.5"
        stroke={props.stroke || colors.TextIcon.OnNormal.White}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
