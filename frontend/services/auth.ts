import { api } from "./api";

const TOKEN_KEY = "admin_token";

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  async login(telefone: string, senha: string): Promise<void> {
    const data = await api.post<LoginResponse>("/auth/login", { telefone, senha });
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, data.access_token);
    }
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
