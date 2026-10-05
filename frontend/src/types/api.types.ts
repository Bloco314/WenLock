export interface ValidationErrorDetail {
  code: string;
  message: string;
  field?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ValidationErrorDetail[];
}

export type HttpError = Error & {
  status?: number;
  code?: string;
  details?: ValidationErrorDetail[];
};

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: ApiError[] | null;
}

export interface ApiListResponse<T> {
  success: boolean;
  message: string;
  data: PaginatedData<T>;
  errors: ApiError[] | null;
}
