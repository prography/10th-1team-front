import { colors } from '@/styles/colors';
import { SVGProps } from "react";

export default function Rulet(props: SVGProps<SVGSVGElement>) {
    return (
        <svg 
            width={props.width} 
            height={props.height} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="8.5" 
                stroke={props.stroke || colors.TextIcon.OnNormal.Black}
            />
            <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5.05681C14 5.37976 13.844 5.68283 13.5812 5.87054L12.1162 6.91697C12.0467 6.96664 11.9533 6.96664 11.8838 6.91697L10.4188 5.87054C10.156 5.68283 10 5.37976 10 5.05681V3Z" 
                fill={props.fill || colors.TextIcon.OnNormal.White} 
                stroke={props.stroke || colors.TextIcon.OnNormal.Black}
            />
            <path d="M9 12H15" 
                stroke={props.stroke || colors.TextIcon.OnNormal.Black} 
                strokeLinecap="round"
            />
            <path d="M12 9L12 15" 
                stroke={props.stroke || colors.TextIcon.OnNormal.Black} 
                strokeLinecap="round"
            />
        </svg>
    )
}