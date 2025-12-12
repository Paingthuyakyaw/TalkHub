import type { StateCreator } from "zustand";

export interface userProps {
  email: string;
  id: string;
  avatar?: string;
  username: string;
}

export interface UserSliceProps {
  user: userProps;
  setUser: (data: userProps) => void;
}

export const createUserSlice: StateCreator<UserSliceProps> = (set) => {
  return {
    user: { email: "", id: "", avatar: "", username: "" },
    setUser: (data) => set((state) => ({ ...state, user: data })),
  };
};
