import { SVGProps } from "react";

export default function BrandKaKao(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="7.5" width="6" height="6" fill="#FEE500" />
      <rect x="13" y="6" width="3" height="3" fill="#03C75A" />
    </svg>
  );
}
