import { SVGProps } from "react";

export default function Exit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 20L20.0001 3.99994"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth={props.strokeWidth || "2"}
        strokeLinecap="round"
      />
      <path
        d="M4 4L20.0001 20.0001"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth={props.strokeWidth || "2"}
        strokeLinecap="round"
      />
    </svg>
  );
}
