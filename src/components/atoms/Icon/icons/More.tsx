import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function More(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="5"
        r="1"
        fill={props.stroke || colors.TextIcon.OnNormal.LowestEmp}
      />
      <circle
        cx="12"
        cy="12"
        r="1"
        fill={props.stroke || colors.TextIcon.OnNormal.LowestEmp}
      />
      <circle
        cx="12"
        cy="19"
        r="1"
        fill={props.stroke || colors.TextIcon.OnNormal.LowestEmp}
      />
    </svg>
  );
}
