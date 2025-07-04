import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchOAuthTokenFromServer } from "@/apis/login";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");

  if (!code || !returnedState) {
    return NextResponse.json(
      { error: "Missing code or state" },
      { status: 400 }
    );
  }

  // CSRF 방지를 위한 state 검증
  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  if (!storedState || storedState !== returnedState) {
    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  }

  try {
    // 서버 API에 인가코드 전달
    const { access_token, refresh_token, is_new_user } =
      await fetchOAuthTokenFromServer({
        provider,
        code,
      });

    // 전달받은 토큰을 쿠키에 저장
    const response = NextResponse.redirect(new URL("/", req.url));
    cookieStore.set("accessToken", access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
    });
    cookieStore.set("refreshToken", refresh_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    // 신규 유저라면 가입 페이지로 리다이렉트
    if (is_new_user) {
      response.headers.set("Location", "/onboarding");
      return response;
    }

    // 기존 유저는 홈으로 리다이렉트
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "OAuth callback failed" },
      { status: 500 }
    );
  }
}
