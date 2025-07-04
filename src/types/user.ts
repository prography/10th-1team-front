export type Provider = "KAKAO" | "NAVER";

export interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export type UserInfo = {
  user_id: string;
  provider: Provider;
  nickname: string;
  level: number;
  created_at: string;
};

export interface UserInfoResponse {
  data: UserInfo;
}
