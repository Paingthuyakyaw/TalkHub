import type { StateCreator } from "zustand";

export interface AuthSlice {
  token: string;
  setAuth: (token: string) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => {
  const token = localStorage.getItem("token") || "";
  return {
    token,
    setAuth: (newToken: string) =>
      set((state) => {
        localStorage.setItem("token", newToken);
        return { ...state, token: newToken };
      }),
  };
};
