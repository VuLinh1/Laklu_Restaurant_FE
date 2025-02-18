import { Credential, TokenResponse } from '@/features/auth/types';
import { post } from '@/lib/fetchWrapper';
import { ApiResponse } from '@/types/ApiResponse';

export function login(
  credential: Credential
): Promise<ApiResponse<TokenResponse>> {
  return post<TokenResponse>('/api/v1/auth/login', credential);
}
