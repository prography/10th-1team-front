import { SVGProps } from "react";

export default function Search(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11"
        cy="12"
        r="7"
        transform="rotate(-90 11 12)"
        stroke={props.stroke || "#0048FF"}
        strokeWidth={props.strokeWidth || "2"}
      />
      <path
        d="M20.0336 21.4469C20.4241 21.8374 21.0573 21.8374 21.4478 21.4469C21.8384 21.0563 21.8384 20.4232 21.4478 20.0326L20.0336 21.4469ZM16.5942 16.5933L15.8871 17.3004L20.0336 21.4469L20.7407 20.7397L21.4478 20.0326L17.3013 15.8862L16.5942 16.5933Z"
        fill={props.stroke || "#0048FF"}
      />
    </svg>
  );
}
