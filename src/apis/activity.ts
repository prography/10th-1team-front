import { authProxyAPI } from "./customAxios";
import { fetchWithAuth } from "./fetchWithAuth";
import type { SavedGroupResponse, SavedPlacesResponse } from "@/types/activity";
import qs from "qs";

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
    return { total: 0, groups: [] };
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
    return {
      group_id: "",
      group_name: "",
      icon: "",
      total: 0,
      places: [],
    };
  }
};

export const deleteBookmarkedPlace = async (
  groupId: string,
  placeId: string[]
) => {
  try {
    const queryString = qs.stringify(
      { place_ids: placeId },
      { arrayFormat: "repeat" }
    );
    const response = await authProxyAPI.delete(
      `/bookmark/group/${groupId}/places?${queryString}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to delete bookmarked place:", error);
    throw error;
  }
};
