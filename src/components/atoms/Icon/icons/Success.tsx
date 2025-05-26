import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Success(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={props.fill || colors.Status.Accent.Main}
      />
      <path
        d="M7 11.4L10.75 15L17 9"
        stroke={props.stroke || colors.TextIcon.OnNormal.White}
        strokeWidth="2"
      />
    </svg>
  );
}
