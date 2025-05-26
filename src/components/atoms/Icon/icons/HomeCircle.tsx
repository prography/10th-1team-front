import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function HomeCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_394_5663)">
        <circle
          cx="12"
          cy="12"
          r="12"
          fill={props.fill || colors.Surface.Normal.Container0}
        />
        <path
          d="M12 5
            L17.6402 9.70015
            C17.8682 9.89015 18 10.1716 18 10.4684
            L18 18
            L14 18
            L14 15.75
            L14 14.5
            C14 13.9477 13.5523 13.5 13 13.5
            L11 13.5
            C10.4477 13.5 10 13.9477 10 14.5
            L10 18
            L6 18
            L6 10.4684
            C6 10.1716 6.13182 9.89015 6.35982 9.70015
            L12 5Z"
          stroke={props.stroke || colors.TextIcon.OnNormal.Black}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_394_5663">
          <rect
            width="24"
            height="24"
            fill={props.fill || colors.Surface.Normal.Container0}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
