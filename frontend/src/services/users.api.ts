import { ApiResponse } from "@/types/api.types";
import { api } from "./api";
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  PaginatedResponse,
  LoginPayload,
} from "@/types";

export const usersApi = {
  getAll: () => api.get<ApiResponse<User[]>>("/users"),

  getPaginated: (page = 1, limit = 10) =>
    api.get<PaginatedResponse<User>>(
      `/users/paginated?page=${page}&limit=${limit}`,
    ),

  getPaginatedSearch: (textSearch: string, page = 1, limit = 10) =>
    api.get<PaginatedResponse<User>>(
      `/users/paginated-search?textSearch=${textSearch}&page=${page}&limit=${limit}`,
    ),

  getById: (id: number) => api.get<ApiResponse<User>>(`/users/${id}`),

  create: (payload: CreateUserPayload) =>
    api.post<ApiResponse<User>>("/users", payload),

  update: (id: number, payload: UpdateUserPayload) =>
    api.patch<ApiResponse<User>>(`/users/${id}`, payload),

  delete: (id: number) => api.delete(`/users/${id}`),

  login: (payload: LoginPayload) =>
    api.post<ApiResponse<{ token: string; user: User }>>(
      "/users/login",
      payload,
    ),

  resetPassword: (email: string) =>
    api.post<ApiResponse<{ message: string }>>("/users/reset-password", {
      email,
    }),
};
