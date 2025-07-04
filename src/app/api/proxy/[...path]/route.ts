/**
 * 이 프록시 서버는 클라이언트가 직접 Authorization 헤더를 설정해 요청하기 어려운 환경(SSR, HttpOnly 쿠키 기반 인증)에서,
 * 서버가 HttpOnly 쿠키에서 accessToken을 꺼내 Authorization 헤더를 주입하여 백엔드 API에 안전하게 요청을 전달하기 위해 사용됩니다.
 * authProxyAPI 인스턴스를 통해 백엔드 API에 요청을 전달하면, 해당 프록시 서버로 요청이 전달됩니다.
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function handler(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  const { params } = context;
  const { path } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${path.join("/")}`;

  let body: string | undefined = undefined;
  if (["POST", "PATCH", "PUT"].includes(req.method)) {
    body = await req.text();
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const backendRes = await fetch(backendUrl, {
    method: req.method,
    headers,
    body,
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
