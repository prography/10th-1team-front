import { API } from ".";

export const getRegion = async () => {
  try {
    const response = await API.get("regions");
    return response.data;
  } catch (error) {
    console.error("Region 조회 실패:", error);
    throw error;
  }
};
