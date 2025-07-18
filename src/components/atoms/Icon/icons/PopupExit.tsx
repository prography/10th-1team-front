import { SVGProps } from "react";

export default function PopupExit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1336_26855)">
        <circle cx="24" cy="24" r="24" fill="black" fillOpacity="0.5" />
        <path
          d="M16 32L32.0001 15.9999"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 16L32.0001 32.0001"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1336_26855">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
