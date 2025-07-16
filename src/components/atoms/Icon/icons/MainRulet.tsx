import { colors } from "@/styles/colors";

interface MainRuletProps {
  size?: number;
}

export default function MainRulet({ size = 48 }: MainRuletProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="48"
        height="48"
        rx="8"
        fill={colors.Surface.Normal.ContainerB50}
      />
      <circle cx="24" cy="25" r="16" fill="#99B6FF" />
      <path
        d="M39 25C39 27.5266 38.3618 30.0122 37.1446 32.2263C35.9274 34.4404 34.1707 36.3111 32.0374 37.6649L24 25H39Z"
        fill="white"
      />
      <path
        d="M9 25C9 27.5266 9.63821 30.0122 10.8554 32.2263C12.0726 34.4404 13.8293 36.3111 15.9626 37.6649L24 25H9Z"
        fill="white"
      />
      <path
        d="M31.4998 12.0095C29.3118 10.7462 26.84 10.0561 24.314 10.0031C21.788 9.95023 19.2895 10.5362 17.0504 11.7068L23.9999 24.9999L31.4998 12.0095Z"
        fill="white"
      />
      <circle cx="24.125" cy="25.123" r="2" fill="#0048FF" />
      <path
        d="M20.125 7.12305C20.125 6.57076 20.5727 6.12305 21.125 6.12305H27.125C27.6773 6.12305 28.125 6.57076 28.125 7.12305V11.8511C28.125 12.1232 28.0142 12.3834 27.8181 12.572L24.2636 15.9898C24.1862 16.0642 24.0638 16.0642 23.9864 15.9898L20.4319 12.572C20.2358 12.3834 20.125 12.1232 20.125 11.8511V7.12305Z"
        fill="#0048FF"
      />
    </svg>
  );
}
