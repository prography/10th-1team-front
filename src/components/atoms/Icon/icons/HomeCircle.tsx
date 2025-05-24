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
        <circle cx="12" cy="12" r="12" fill={props.fill || "white"} />
        <path
          d="M12 5L17.6402 9.70015C17.8682 9.89015 18 10.1716 18 10.4684L18 18L14 18L14 15.75L14 14.5C14 13.9477 13.5523 13.5 13 13.5L11 13.5C10.4477 13.5 10 13.9477 10 14.5L10 18L6 18L6 10.4684C6 10.1716 6.13182 9.89015 6.35982 9.70015L12 5Z"
          stroke={props.stroke || "#1A1A1A"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPathh id="clip0_394_5663">
          <rect width="24" height="24" fill={props.fill || "white"} />
        </clipPathh>
      </defs>
    </svg>
  );
}
