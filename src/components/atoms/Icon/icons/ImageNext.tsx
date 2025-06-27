import { colors } from '@/styles/colors';
import { SVGProps } from "react";

export default function ImageNext(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_44_3493)">
        <circle
          cx="12"
          cy="12" 
          r="12" 
          fill={props.fill || colors.Surface.Normal.Bg06} />
        <path 
          d="M10 6
            L16 12
            L10 18" 
          stroke={props.stroke || colors.TextIcon.OnNormal.White} 
          strokeWidth={props.strokeWidth || "2"} 
          strokeLinecap="round" 
          strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_44_3493">
            <rect
            width="24" 
            height="24" 
            fill={props.fill || colors.TextIcon.OnNormal.White}/>
          </clipPath>
        </defs>
    </svg>
  );
}
