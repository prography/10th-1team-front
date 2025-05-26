import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10.2667L7.5 14L16 6"
        stroke={props.stroke || colors.Brand.Primary.Main}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
