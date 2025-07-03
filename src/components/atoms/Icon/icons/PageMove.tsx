import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function PageMove(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 15L17 10L11 5"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 10H16"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
        strokeLinecap="round"
      />
    </svg>
  );
}
