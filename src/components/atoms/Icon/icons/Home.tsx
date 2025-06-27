import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Home(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24" 
      fill={props.fill || colors.Surface.Normal.Container0}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3
          L19.6328 9.23837
          C19.8652 9.4283 20 9.71255 20 10.0127
          L20 20
          L14.6667 20
          L14.6667 17.0577
          L14.6667 15.1154
          C14.6667 14.5631 14.2189 14.1154 13.6667 14.1154
          L10.3333 14.1154C9.78105 14.1154 9.33333 14.5631 9.33333 15.1154
          L9.33333 20L4 20L4 10.0127C4 9.71254 4.13479 9.4283 4.36717 9.23837
          L12 3Z"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
        strokeWidth={props.strokeWidth || "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  );
}
