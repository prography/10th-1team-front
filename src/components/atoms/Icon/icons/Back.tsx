import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Back(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4L8 12L16 20"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
        strokeWidth={props.strokeWidth || "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
