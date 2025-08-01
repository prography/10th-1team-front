import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/global.css";
import Providers from "../providers/providers";
import Script from "next/script";
import { getMyInfo } from "@/apis/user";
import ModalRenderer from "@/components/modals/ModalRenderer";

export const metadata: Metadata = {
  title: "리뷰매치",
  description: "리뷰 매치 - 맛집 리뷰 한 눈에 비교",
  icons: {
    icon: "/favicon.ico",
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  let user = null;
  try {
    user = await getMyInfo();
  } catch {
    user = null;
  }

  return (
    <html lang="ko">
      <body>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
        <Providers user={user}>
          {children}
          <div id="modal-root"></div>
          <ModalRenderer />
        </Providers>
      </body>
    </html>
  );
}
