export type Provider = "KAKAO" | "NAVER";

export interface UserState {
  user: UserInfoResponse["data"] | null;
  setUser: (user: UserInfoResponse["data"]) => void;
}

export interface UserInfoResponse {
  data: {
    user_id: string;
    provider: Provider;
    nickname: string;
    level: number;
    created_at: string;
  };
}
