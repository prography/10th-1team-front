import { SVGProps } from "react";

export default function BrandNaver(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="15"
        width="12"
        height="12"
        fill={props.fill || "#03C75A"}
      />
      <rect x="26" y="12" width="6" height="6" fill={props.fill || "#FEE500"} />
    </svg>
  );
}
