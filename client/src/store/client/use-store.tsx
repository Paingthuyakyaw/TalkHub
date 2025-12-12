import { create } from "zustand";
import { createAuthSlice, type AuthSlice } from "./auth.slice";
import { createUserSlice, type UserSliceProps } from "./user.slice";

export const useBoundStore = create<AuthSlice & UserSliceProps>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUserSlice(...a),
}));
