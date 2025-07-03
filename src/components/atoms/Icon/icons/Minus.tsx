import { SVGProps } from "react";

export default function Minus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.25"
        y="0.25"
        width="27.5"
        height="27.5"
        rx="3.75"
        fill="white"
        fillOpacity="0.5"
      />
      <rect
        x="0.25"
        y="0.25"
        width="27.5"
        height="27.5"
        rx="3.75"
        stroke="#CFD8E7"
        strokeWidth="0.5"
      />
      <path
        d="M6 14H22"
        stroke={props.stroke || "#7585A2"}
        strokeLinecap="round"
      />
    </svg>
  );
}
