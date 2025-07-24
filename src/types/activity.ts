export interface GroupInfo {
  group_id: string;
  group_name: string;
  icon: string;
  number_of_bookmark: number;
  is_saved: boolean;
  create_at: string;
  saved_at: string;
}

export interface PlaceInfo {
  place_id: string;
  place_name: string;
  road_address: string;
  category: string;
  legal: number;
  saved_at: string;
}

export interface SavedGroupResponse {
  data: {
    total: number;
    groups: GroupInfo[];
  };
}

export interface SavedPlacesResponse {
  data: {
    group_id: string;
    group_name: string;
    icon: string;
    total: number;
    places: PlaceInfo[];
  };
}

export interface VotedActivityInfo {
  place_id: string;
  place_name: string;
  category: string;
  platform: string;
  reasons: ("MANY_REVIEWS" | "DETAILED" | "HONEST" | "ACCURATE")[];
  voted_date: string;
}

export interface VotedActivityResponse {
  data: VotedActivityInfo[];
}
