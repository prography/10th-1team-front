export interface Group {
  group_id: string;
  group_name: string;
  icon: string;
  is_saved: boolean;
  number_of_bookmark: number;
  created_at: string;
  saved_at: string;
}

export interface CreateGroupRequest {
  group_name: string;
  icon: string;
}
