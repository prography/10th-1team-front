import { colors } from "@/styles/colors";

interface MainCalandarProps {
  size?: number;
}

export default function MainCalandar({ size = 48 }: MainCalandarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="48"
        height="48"
        rx="8"
        fill={colors.Surface.Normal.ContainerB50}
      />
      <rect x="10" y="16" width="28" height="22" rx="2" fill="#99B6FF" />
      <path
        d="M10 14C10 12.8954 10.8954 12 12 12H36C37.1046 12 38 12.8954 38 14V20H10V14Z"
        fill="#0048FF"
      />
      <path
        d="M15 10C15 9.44772 15.4477 9 16 9H18C18.5523 9 19 9.44772 19 10V12H15V10Z"
        fill="#0048FF"
      />
      <path
        d="M22 10C22 9.44772 22.4477 9 23 9H25C25.5523 9 26 9.44772 26 10V12H22V10Z"
        fill="#0048FF"
      />
      <path
        d="M29 10C29 9.44772 29.4477 9 30 9H32C32.5523 9 33 9.44772 33 10V12H29V10Z"
        fill="#0048FF"
      />
      <path d="M20 26.5L23 29.5L28 24" stroke="white" strokeWidth="3" />
    </svg>
  );
}
