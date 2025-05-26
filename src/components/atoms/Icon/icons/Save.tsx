import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Save(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill={props.fill || colors.TextIcon.OnNormal["Main 500"]}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 3V20.1309L12.5547 15.168L12 14.7979L11.4453 15.168L4 20.1309V3H20Z"
        stroke={props.stroke || colors.TextIcon.OnNormal["Main 500"]}
        strokeWidth="2"
      />
    </svg>
  );
}
