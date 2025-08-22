import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.57 10.3763L6.82925 16.2744C6.50596 16.5573 6 16.3277 6 15.8981L6 4.10188C6 3.67231 6.50596 3.44271 6.82925 3.7256L13.57 9.62371C13.7976 9.82292 13.7976 10.1771 13.57 10.3763Z"
        fill={props.fill || colors.TextIcon.OnNormal.LowestEmp}
      />
    </svg>
  );
}
