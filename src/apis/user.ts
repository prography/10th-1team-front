import { UserInfoResponse } from "@/types/user";
import { authProxyAPI } from "./customAxios";
import { fetchWithAuth } from "./fetchWithAuth";

export const getMyInfo = async () => {
  // Server 컴포넌트에서 실행되는 경우
  if (typeof window === "undefined") {
    try {
      const data = await fetchWithAuth<UserInfoResponse>("/users/me");
      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    // Client 컴포넌트에서 실행되는 경우 (프록시 사용)
    const { data } = await authProxyAPI.get<UserInfoResponse>(`/users/me`);
    return data.data;
  }
};
