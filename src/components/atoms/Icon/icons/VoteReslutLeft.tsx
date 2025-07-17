import { SVGProps } from "react";

export default function VoteReslutLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 100 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 35C100 36.6569 98.6569 38 97 38H8C3.58172 38 0 34.4183 0 30V12C0 5.37258 5.37258 0 12 0H72.6309C78.1372 7.98327e-05 82.937 3.7479 84.2725 9.08984L88.9366 27.7464C89.5616 30.2463 91.8077 32 94.3845 32H97C98.6569 32 100 33.3431 100 35Z"
        fill={props.fill || "#F5F8FF"}
      />
    </svg>
  );
}
