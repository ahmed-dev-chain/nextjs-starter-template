import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { tokenManager } from "@/utils/auth/token";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => 
        set({ 
          user, 
          isAuthenticated: !!user, 
          isLoading: false 
        }),
      logout: () => {
        tokenManager.clearTokens();
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist the user object, not the loading state
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
