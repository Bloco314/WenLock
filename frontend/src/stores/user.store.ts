import { create } from "zustand";
import { usersApi, type LoginPayload } from "@/services/users.api";
import type { User } from "@/types";

interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  login: async (payload) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await usersApi.login(payload);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({
        token,
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: "Falha ao realizar login. Verifique suas credenciais.",
      });

      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      error: null,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));
