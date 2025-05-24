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
      <circle cx="12" cy="12" r="8" fill={props.fill || "#ABB7CD"} />
      <path
        d="M9 15.0005L15 9.00049"
        stroke={props.stroke || "white"}
        strokeLinecap="round"
      />
      <path
        d="M9 9L15 15"
        stroke={props.stroke || "white"}
        strokeLinecap="round"
      />
    </svg>
  );
}
