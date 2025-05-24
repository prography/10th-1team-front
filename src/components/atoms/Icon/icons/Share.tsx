import { SVGProps } from "react";

export default function Share(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8L12 2L18 8"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth="2"
      />
      <path
        d="M12 3L12 15"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth="2"
      />
      <path
        d="M21 10V20H3V10"
        stroke={props.stroke || "#1A1A1A"}
        strokeWidth="2"
      />
    </svg>
  );
}
