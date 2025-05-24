import { SVGProps } from "react";

export default function Filter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 7H16" stroke={props.stroke || "#0048FF"} />
      <circle
        cx="8"
        cy="7"
        r="1.5"
        fill="white"
        stroke={props.stroke || "#0048FF"}
      />
      <path d="M16 13H4" stroke={props.stroke || "#0048FF"} />
      <circle
        cx="2"
        cy="2"
        r="1.5"
        transform="matrix(-1 0 0 1 14 11)"
        fill="white"
        stroke={props.stroke || "#0048FF"}
      />
    </svg>
  );
}
