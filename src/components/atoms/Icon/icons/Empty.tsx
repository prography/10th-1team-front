import { SVGProps } from "react";

export default function Empty(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.9375 10.625H9.0625C8.19956 10.625 7.5 11.3246 7.5 12.1875V23.9062C7.5 24.7692 8.19956 25.4688 9.0625 25.4688H17.6562L22.3438 29.375L27.0312 25.4688H30.9375C31.8004 25.4688 32.5 24.7692 32.5 23.9062V12.1875C32.5 11.3246 31.8004 10.625 30.9375 10.625Z"
        fill="#ABB7CD"
      />
      <mask
        id="mask0_2102_30930"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="7"
        y="10"
        width="26"
        height="20"
      >
        <path
          d="M30.9375 10.625H9.0625C8.19956 10.625 7.5 11.3246 7.5 12.1875V23.9062C7.5 24.7692 8.19956 25.4688 9.0625 25.4688H17.6562L22.3438 29.375L27.0312 25.4688H30.9375C31.8004 25.4688 32.5 24.7692 32.5 23.9062V12.1875C32.5 11.3246 31.8004 10.625 30.9375 10.625Z"
          fill="#CFD8E7"
        />
      </mask>
      <g mask="url(#mask0_2102_30930)">
        <path d="M0 27.3655L37.5 11.3594V30.1094H0V27.3655Z" fill="#E8EDFC" />
      </g>
    </svg>
  );
}
