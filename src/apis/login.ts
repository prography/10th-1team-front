import axios from "axios";
import { publicAPI } from "./customAxios";
import type { OAuthTokenResponse } from "@/types/login";

export async function fetchOAuthTokenFromServer({
  provider,
  code,
}: {
  provider: string;
  code: string;
}) {
  const { data } = await publicAPI.post<OAuthTokenResponse>(
    `/login/oauth2/code/${provider}?code=${code}`
  );
  return data.data;
}

export async function getNewAccessToken(refreshToken: string) {
  const { data } = await publicAPI.post<OAuthTokenResponse>(
    `/login/refresh-token`,
    {
      refreshToken,
    }
  );
  return data.data;
}

export async function logout() {
  await axios.post("/api/auth/logout");
}
