import { SVGProps } from "react";

export default function VoteReslutLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 120 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M120 35C120 36.6569 118.657 38 117 38H3C1.34314 38 0 36.6569 0 35C0 33.3431 1.34315 32 3 32H10.7538C14.4247 32 17.6246 29.5016 18.5149 25.9403L22.7275 9.08984C24.063 3.7479 28.8628 7.96298e-05 34.3691 0H89.6309C95.1372 7.91296e-05 99.937 3.7479 101.272 9.08984L105.618 26.4704C106.43 29.7202 109.35 32 112.7 32H117C118.657 32 120 33.3431 120 35Z"
        fill={props.fill || "#F5F8FF"}
      />
    </svg>
  );
}
