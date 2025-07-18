import { SVGProps } from "react";

export default function Complete(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#00C2A8" />
      <path d="M7 11.4L10.75 15L17 9" stroke="white" strokeWidth="2" />
    </svg>
  );
}
