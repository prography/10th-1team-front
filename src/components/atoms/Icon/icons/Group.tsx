import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Group(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1165_19002)">
        <circle
          cx="12"
          cy="12"
          r="12"
          fill={props.fill || colors.Etc.Color.Pink}
        />
        <path
          d="M11.5876 4.60179C11.7862 4.31201 12.2138 4.31201 12.4124 4.60179L14.7209 7.97006C14.7859 8.06492 14.8816 8.13447 14.9919 8.16699L18.9087 9.32158C19.2456 9.42091 19.3778 9.82765 19.1636 10.1061L16.6735 13.3424C16.6034 13.4335 16.5668 13.5461 16.57 13.661L16.6822 17.7429C16.6919 18.094 16.3459 18.3454 16.0149 18.2277L12.1675 16.8596C12.0592 16.821 11.9408 16.821 11.8325 16.8596L7.98511 18.2277C7.65411 18.3454 7.30812 18.094 7.31778 17.7429L7.43004 13.661C7.4332 13.5461 7.39664 13.4335 7.32651 13.3424L4.83644 10.1061C4.62221 9.82765 4.75436 9.42091 5.09134 9.32158L9.00809 8.16699C9.1184 8.13447 9.21413 8.06492 9.27915 7.97006L11.5876 4.60179Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1165_19002">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
