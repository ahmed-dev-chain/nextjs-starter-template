import { ApiService } from "./api.service";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export class AuthService extends ApiService {
  login(email: string, password: string) {
    return this.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
  }

  me() {
    return this.get("/auth/me");
  }
}