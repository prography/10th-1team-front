import { SVGProps } from "react";

export default function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5H20"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12H20"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 19H20"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
