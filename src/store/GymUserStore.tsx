import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
}

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  isLoggenIn: boolean;
  isFreshLogin: boolean;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  resetFreshLogin: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      accessToken: null,
      isLoggenIn: false,
      isFreshLogin: false,
      isLoading: false,
      // Iniciar sesion
      login: (userData) => {
        set((state) => ({
          user: (state.user = userData.user),
          token: (state.accessToken = userData.token),
          isLoggenIn: (state.isLoggenIn = true),
          isFreshLogin: (state.isFreshLogin = true),
          isLoading: false,
        }));
      },
      logout: () => {
        set(() => ({
          user: null,
          token: null,
          isLoggenIn: false,
          isFreshLogin: false,
          isLoading: false,
        }));
      },
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
      resetFreshLogin: () => {
        set({ isFreshLogin: false });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
