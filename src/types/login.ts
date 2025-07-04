export interface OAuthTokenResponse {
  data: {
    access_token: string;
    refresh_token: string;
    is_new_user: boolean;
  };
}
