import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Radio(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke={props.fill || colors.TextIcon.OnNormal.LowestEmp}
      />
      <path
        d="M7 12.2L9.91667 15L17 9"
        stroke={props.stroke || colors.TextIcon.OnNormal.LowestEmp}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
