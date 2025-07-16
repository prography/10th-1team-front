export interface SavedGroupInfo {
  group_id: string;
  group_name: string;
  icon: string;
  number_of_bookmark: number;
  is_saved: boolean;
  create_at: string;
  saved_at: string;
}

export interface SavedPlacesInfo {
  group_id: string;
  place_id: string;
  place_name: string;
  road_address: string;
  category: string;
  legal: number;
  saved_at: string;
}

export interface SavedPlacesResponse {
  data: SavedPlacesInfo[];
}

export interface SavedGroupResponse {
  data: SavedGroupInfo[];
  // 추후에 전체 북마크개수 필드 추가 제안 예정
}

export interface VotedActivityInfo {
  place_id: string;
  place_name: string;
  category: string;
  platform: string;
  reasons: string[];
  voted_date: string;
}
