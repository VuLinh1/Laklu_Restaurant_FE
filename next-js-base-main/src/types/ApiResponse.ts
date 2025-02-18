export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface ExtraResponse {
  _block?: string[] | null;
  pagination?: Pagination;

  [key: string]: any;
}

export interface ApiResponse<T = any> {
  _status: number;
  _success: boolean;
  _messages: string[] | null | object | string;
  _data: T | null;
  _extra: ExtraResponse;
}

export class ApiResponseError extends Error {
  response: ApiResponse;

  constructor(response: ApiResponse) {
    super(response._messages ? response._messages.toString() : 'Unknown error');
    this.response = response;
  }

  public isValidationError(): boolean {
    return this.response._status === 422 && this.response._data !== null;
  }

  public getValidationErrors(): Record<string, string[]> {
    if (!this.isValidationError()) {
      return {};
    }
    return this.response._data as Record<string, string[]>;
  }
}
