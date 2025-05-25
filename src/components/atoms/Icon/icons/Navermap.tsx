import { SVGProps } from "react";

export default function Navermap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="0.25"
        y="0.25"
        width="23.5"
        height="23.5"
        rx="3.75"
        fill="url(#pattern0_154_3908)"
        stroke="#ABB7CD"
        strokeWidth="0.5"
      />
      <defs>
        <pattern
          id="pattern0_154_3908"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_154_3908" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_154_3908"
          width="512"
          height="512"
          preserveAspectRatio="none"
          xlinkHref="/images/Navermap.png"
        />
      </defs>
    </svg>
  );
}
