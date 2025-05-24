import { SVGProps } from "react";

export default function BackCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_394_5659)">
        <circle cx="12" cy="12" r="12" fill={props.fill || "white"} />
        <path
          d="M12 6L6 12L12 18"
          stroke={props.stroke || "#1A1A1A"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 12H18"
          stroke={props.stroke || "#1A1A1A"}
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_394_5659">
          <rect width="24" height="24" fill={props.fill || "white"} />
        </clipPath>
      </defs>
    </svg>
  );
}
