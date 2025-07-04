import { publicAPI } from "./customAxios";

export const getRegion = async () => {
  try {
    const response = await publicAPI.get("regions");
    return response.data;
  } catch (error) {
    console.error("Region 조회 실패:", error);
    throw error;
  }
};
