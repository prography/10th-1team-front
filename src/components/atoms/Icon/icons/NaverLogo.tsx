import { SVGProps } from "react";

export default function NaverLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3491 12.5627L9.41687 4H4.5V20H9.65088V11.436L15.5831 20H20.5V4H15.3491V12.5627Z"
        fill="white"
      />
    </svg>
  );
}
