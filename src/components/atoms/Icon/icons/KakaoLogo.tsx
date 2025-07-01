import { SVGProps } from "react";

export default function KakaoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1157_15043)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 3.6001C7.52917 3.6001 3.5 6.71306 3.5 10.5524C3.5 12.9401 5.0584 15.0451 7.43152 16.2971L6.43303 19.9446C6.34481 20.2669 6.71341 20.5238 6.99646 20.337L11.3733 17.4483C11.7427 17.4839 12.1181 17.5047 12.5 17.5047C17.4705 17.5047 21.4999 14.3919 21.4999 10.5524C21.4999 6.71306 17.4705 3.6001 12.5 3.6001Z"
          fill="#3D1D1C"
        />
      </g>
      <defs>
        <clipPath id="clip0_1157_15043">
          <rect
            width="17.9999"
            height="18"
            fill="white"
            transform="translate(3.5 3)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
