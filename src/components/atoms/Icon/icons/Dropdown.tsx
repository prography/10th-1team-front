import { SVGProps } from "react";

export default function Dropdown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7L10 13L15 7"
        stroke={props.stroke || "#ABB7CD"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
