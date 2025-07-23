import { authProxyAPI } from "./customAxios";
import useUserStore from "@/store/useUserStore";
import { fetchWithAuth } from "./fetchWithAuth";

export const createGroup = async (data: {
  group_name: string;
  icon: string;
}) => {
  try {
    const response = await authProxyAPI.post("/bookmark/group", data);
    return response.data.data;
  } catch (error) {
    console.error("Group 생성 실패:", error);
    throw error;
  }
};

export const getPlaceGroup = async (placeId: string) => {
  const response = await authProxyAPI.get(`/bookmark/group/${placeId}`);
  return response.data.data;
};
export const getGroup = async () => {
  const response = await authProxyAPI.get(`/bookmark/group}`);
  return response.data.data;
};

export const savePlaceGroup = async (placeId: string, groupIds: string[]) => {
  try {
    const queryParams = groupIds.map((id) => `group_ids=${id}`).join("&");
    const response = await authProxyAPI.put(
      `/bookmark/place/${placeId}?${queryParams}`
    );
    return response.data.data;
  } catch (error) {
    console.error("가게 그룹 저장 실패:", error);
    throw error;
  }
};

export const checkPlaceSaved = async (placeId: string): Promise<boolean> => {
  try {
    // 클라이언트에서 실행되는 경우
    if (typeof window !== "undefined") {
      const { user } = useUserStore.getState();
      if (!user) {
        return false;
      }
      // 엑세스 토큰이 있으면 authAPI로 요청
      const response = await authProxyAPI.get(`/bookmark/saved/${placeId}`);
      return response.data.data;
    } else {
      // 서버 컴포넌트에서 실행되는 경우
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken")?.value;
      if (!accessToken) {
        return false;
      } else {
        const data = await fetchWithAuth(`/bookmark/saved/${placeId}`);
        if (!(data as { data: boolean }).data) {
          return false;
        }
        return (data as { data: boolean }).data;
      }
    }
  } catch (error) {
    console.error("가게 저장 여부 확인 실패:", error);
    throw error;
  }
};
