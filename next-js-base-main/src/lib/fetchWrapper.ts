import { ApiResponse, ApiResponseError } from '@/types/ApiResponse';
import { MutationFunction } from '@tanstack/react-query';
import {SERVER_URL} from "@/config/site.config";

export interface FetchOptions extends RequestInit {
  headers?: HeadersInit | undefined;
  params?: Record<string, string | number>;
  token?: string;
}

export async function fetchWrapper<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers, token, ...restOptions } = options;

  const queryString = params
    ? '?' +
      Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&')
    : '';

  const authHeaders: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const combinedHeaders = new Headers({
    'Content-Type': 'application/json',
    ...authHeaders,
    ...headers,
  });

  try {
    const response = await fetch(SERVER_URL + url + queryString, {
      ...restOptions,
      headers: combinedHeaders,
    });
    if (!response.ok) {
      const errorResponse = (await response.json()) as ApiResponse<T>;
      errorResponse._success = false;
      return errorResponse;
    }

    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    return {
      _status: 500,
      _success: false,
      _messages: [(error as Error).message],
      _data: null,
      _extra: {},
    };
  }
}

export async function get<T>(
  url: string,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchWrapper<T>(url, { ...options, method: 'GET' });
}

export async function post<T>(
  url: string,
  body: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchWrapper<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function put<T>(
  url: string,
  body: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchWrapper<T>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function del<T>(
  url: string,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return fetchWrapper<T>(url, { ...options, method: 'DELETE' });
}

export function createMutationFn<TData, TResponse>(
  api: (data: TData) => Promise<ApiResponse<TResponse>>
): MutationFunction<ApiResponse<TResponse>, TData> {
  return async (data: TData) => {
    const response = await api(data);
    if (response._success) {
      return response;
    }
    throw new ApiResponseError(response);
  };
}
