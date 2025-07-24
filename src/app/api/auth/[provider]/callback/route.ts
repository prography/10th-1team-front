import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchOAuthTokenFromServer } from "@/apis/login";

function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? "https://reviewmatch.co.kr"
    : "";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");

  if (!code || !returnedState) {
    return NextResponse.redirect(
      new URL(`${getBaseUrl()}/oauth/callback?error=missing-code`, req.url)
    );
  }

  // CSRF 검증
  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  if (!storedState || storedState !== returnedState) {
    return NextResponse.redirect(
      new URL(`${getBaseUrl()}/oauth/callback?error=invalid-state`, req.url)
    );
  }

  // from 값 디코딩
  let from: string | null = null;
  try {
    const decoded = JSON.parse(
      Buffer.from(returnedState, "base64url").toString()
    );
    from = decoded.from ?? null;
  } catch (err) {
    console.error("Failed to parse state:", err);
    return NextResponse.redirect(
      new URL(`${getBaseUrl()}/oauth/callback?error=invalid-state`, req.url)
    );
  }

  try {
    const { access_token, refresh_token, is_new_user } =
      await fetchOAuthTokenFromServer({
        provider: provider.toUpperCase(),
        code,
      });

    const redirectTo = is_new_user ? "/onboarding" : (from ?? "/");

    const res = NextResponse.redirect(
      new URL(
        `${getBaseUrl()}/oauth/callback?redirectTo=${encodeURIComponent(redirectTo)}&provider=${provider}`,
        req.url
      )
    );

    res.cookies.set("accessToken", access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
    });

    res.cookies.set("refreshToken", refresh_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(
      new URL(`${getBaseUrl()}/oauth/callback?error=server-error`, req.url)
    );
  }
}
