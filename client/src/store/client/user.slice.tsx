import type { StateCreator } from "zustand";

export interface userProps {
  email: string;
  id: string;
  avatar?: string;
}

export interface UserSliceProps {
  user: userProps;
  setUser: (data: userProps) => void;
}

export const createUserSlice: StateCreator<UserSliceProps> = (set) => {
  return {
    user: { email: "", id: "", avatar: "" },
    setUser: (data) => set((state) => ({ ...state, user: data })),
  };
};
