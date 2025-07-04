/**
 * ✅ SSR 환경에서 인증이 필요한 API 요청 시,
 * HttpOnly 쿠키에서 JWT를 읽어 Authorization 헤더로 주입해 요청하는 헬퍼 함수입니다.
 *
 * ❌ 클라이언트(CSR) 환경에서는 사용 불가하며,
 *    사용 시 프록시 API 또는 상태 관리된 토큰을 사용해야 합니다.
 *
 * 사용 예:
 * if (typeof window === "undefined") {
 *   const data = await fetchWithAuth("/users/me");
 * }
 */
export async function fetchWithAuth<T>(url: string, init?: RequestInit) {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    return res.json() as Promise<T>;
  } else {
    throw new Error("fetchWithAuth can only be used on the server.");
  }
}
