import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function TapDelete(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 16L16.0001 3.99993"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
        strokeLinecap="round"
      />
      <path
        d="M4 4L16.0001 16.0001"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
        strokeLinecap="round"
      />
    </svg>
  );
}
