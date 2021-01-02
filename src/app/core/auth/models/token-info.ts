export interface TokenInfo {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token?: string;
}
