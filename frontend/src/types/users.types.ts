export interface CreateUserPayload {
  name: string;
  email: string;
  registration: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  registration: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UpdateUserPayload = Partial<CreateUserPayload>;

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface PaginatedResponse<T> {
  sucess: boolean
  message: string
  data:{
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}
