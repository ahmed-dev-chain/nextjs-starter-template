import { ApiService } from "./api.service";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export class AuthService extends ApiService {
  async login(email: string, password: string) {
    return this.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
  }

  async me() {
    return this.get("/auth/me");
  }

  async refresh() {
    return this.handleUnauthorized();
  }
}

export const authService = new AuthService();
