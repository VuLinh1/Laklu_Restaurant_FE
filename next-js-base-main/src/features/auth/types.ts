export interface Credential {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: {
    value: string;
    expiresIn: string;
  };
  refreshToken: {
    value: string;
    expiresIn: string;
  };
}
