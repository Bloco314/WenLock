import { ApiResponse, HttpError, ApiError } from "@/types/api.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
    } catch {
      throw new Error("Erro de conexão. Verifique sua internet.");
    }

    let data: ApiResponse<unknown>;
    try {
      data = await response.json();
    } catch {
      const parseError = new Error(
        "Resposta inválida do servidor",
      ) as HttpError;
      parseError.status = response.status;
      throw parseError;
    }

    if (!response.ok || !data.success) {
      const apiData = data as ApiResponse<unknown> & { error?: ApiError };
      const errorMessage =
        apiData.error?.message ||
        apiData.errors?.[0]?.message ||
        apiData.message ||
        "Requisição falhou";

      const requestError = new Error(errorMessage) as HttpError;
      requestError.status = response.status;
      requestError.code = apiData.error?.code || apiData.errors?.[0]?.code;
      requestError.details =
        apiData.error?.details || apiData.errors?.[0]?.details;
      throw requestError;
    }

    return data as T;
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async patch<T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async put<T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete(endpoint: string, options: RequestInit = {}): Promise<void> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok && response.status !== 204) {
      throw new Error("Requisição de remoção falhou");
    }
  }
}

export const api = new ApiService(API_URL);
