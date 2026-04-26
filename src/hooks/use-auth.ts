import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore, AuthState } from "@/store/auth.store";
import { tokenManager } from "@/utils/auth/token";

export const useLogin = () => {
  const setUser = useAuthStore((state: AuthState) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: [string, string]) => authService.login(data[0], data[1]),
    onSuccess: (response) => {
      if (response.success) {
        const { accessToken, refreshToken } = response.data;

        // Store tokens
        tokenManager.setTokens(accessToken, refreshToken);

        // Update user state
        setUser({ id: "temp", email: "temp" });

        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state: AuthState) => state.logout);
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
  };
};
