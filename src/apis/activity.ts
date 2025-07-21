import { authProxyAPI } from "./customAxios";
import { fetchWithAuth } from "./fetchWithAuth";
import type { SavedGroupResponse, SavedPlacesResponse } from "@/types/activity";

export const getBookmarkedGroups = async () => {
  try {
    let data;
    if (typeof window === "undefined") {
      data = await fetchWithAuth<SavedGroupResponse>("/bookmark/group");
      return data.data;
    } else {
      const response =
        await authProxyAPI.get<SavedGroupResponse>("/bookmark/group");
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch bookmarked groups:", error);
    return null;
  }
};

export const getBookmarkedPlaces = async (group_id: string) => {
  try {
    let data;
    if (typeof window === "undefined") {
      data = await fetchWithAuth<SavedPlacesResponse>(
        `/bookmark/place/${group_id}`
      );
      return data.data;
    } else {
      const response = await authProxyAPI.get<SavedPlacesResponse>(
        `/bookmark/place/${group_id}`
      );
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch bookmarked places:", error);
    return null;
  }
};
