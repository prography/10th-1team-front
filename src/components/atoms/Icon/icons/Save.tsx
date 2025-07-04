import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Save(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill={props.fill || colors.TextIcon.OnNormal.White}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3.5H18C18.8284 3.5 19.5 4.17157 19.5 5V19.7705C19.4998 20.202 18.9893 20.4306 18.667 20.1436L12.998 15.0938C12.4294 14.5873 11.5706 14.5873 11.002 15.0938L5.33301 20.1436C5.01072 20.4306 4.50019 20.202 4.5 19.7705V5C4.5 4.17157 5.17157 3.5 6 3.5Z"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
      />
    </svg>
  );
}
