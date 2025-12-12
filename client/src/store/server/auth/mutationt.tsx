import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../api";
import { router } from "../../../main";
import { useBoundStore } from "../../client/use-store";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const { data } = await axios.post("/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};

export const useLogin = () => {
  const { setAuth } = useBoundStore();
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      setAuth(data.token);
      router.invalidate();
    },
    onError: () => {},
  });
};
