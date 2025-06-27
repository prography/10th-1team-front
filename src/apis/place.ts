import { API } from ".";

export const getPlaceDetail = async (id: string) => {
  try {
    const response = await API.get(`/search/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error('Place 상세 정보 조회 실패:', error);
    throw error;
  }
};