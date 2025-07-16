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
    return NextResponse.redirect(
      new URL("/oauth/callback?error=missing-code", req.url)
    );
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  if (!storedState || storedState !== returnedState) {
    return NextResponse.redirect(
      new URL("/oauth/callback?error=invalid-state", req.url)
    );
  }

  try {
    const { access_token, refresh_token, is_new_user } =
      await fetchOAuthTokenFromServer({
        provider: provider.toUpperCase(),
        code,
      });

    const redirectTo = is_new_user ? "/onboarding" : "/";

    const res = NextResponse.redirect(
      new URL(
        `/oauth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
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

    res.cookies.set("provider", provider, {
      path: "/",
      sameSite: "strict",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(
      new URL("/oauth/callback?error=server-error", req.url)
    );
  }
}
