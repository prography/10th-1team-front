import { colors } from "@/styles/colors";
import { SVGProps } from "react";

export default function Share(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5675 5.65927C16.6814 5.66166 16.7758 5.57095 16.7758 5.45707V3.48284C16.7758 3.30466 16.9912 3.21543 17.1172 3.34142L19.6753 5.89945L21.8451 8.06933C21.9283 8.15249 21.9221 8.2891 21.8318 8.36439L19.634 10.196L17.1039 12.3046C16.9736 12.4132 16.7758 12.3205 16.7758 12.1509V10.1548C16.7758 10.0501 16.6928 9.96285 16.5883 9.95657C13.1057 9.74719 11.2363 11.1328 10.4528 11.9411C10.3119 12.0864 10.0037 11.9807 10.0103 11.7784C10.0612 10.1995 10.3361 8.6211 11.5713 7.38644C13.1309 5.82628 15.3499 5.63369 16.5675 5.65927Z"
        stroke="#1A1A1A"
      />
      <path
        d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12"
        stroke={props.stroke || colors.TextIcon.OnNormal.Black}
        strokeLinecap="round"
      />
    </svg>
  );
}
