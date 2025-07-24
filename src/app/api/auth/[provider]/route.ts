import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const searchParams = req.nextUrl.searchParams;
  const from = searchParams.get("from");

  const rawState = {
    id: crypto.randomUUID(),
    from: from ?? "/",
  };

  const state = Buffer.from(JSON.stringify(rawState)).toString("base64url");

  let authURL = "";

  switch (provider) {
    case "kakao": {
      const clientId = process.env.KAKAO_REST_API_KEY;
      const redirectUri = process.env.KAKAO_REDIRECT_URI;
      authURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;
      break;
    }
    case "naver": {
      const clientId = process.env.NAVER_CLIENT_ID;
      const redirectUri = process.env.NAVER_REDIRECT_URI;
      authURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;
      break;
    }
    default:
      return NextResponse.json(
        { error: "Unsupported provider" },
        { status: 400 }
      );
  }

  const cookieStore = await cookies();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 300,
    sameSite: "lax",
  });

  return NextResponse.redirect(authURL);
}
