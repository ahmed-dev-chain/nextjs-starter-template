export const tokenManager = {
  getAccessToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  getRefreshToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },

  setAccessToken: (token: string) => {
    localStorage.setItem("accessToken", token);
  },

  setRefreshToken: (token: string) => {
    localStorage.setItem("refreshToken", token);
  },

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};