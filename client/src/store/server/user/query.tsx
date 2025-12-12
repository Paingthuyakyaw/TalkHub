import { useQuery } from "@tanstack/react-query";
import { authJsonToken, axios } from "../../../api";
import type { userResponseProps } from "./typed";

const getAllUser = async (): Promise<userResponseProps> => {
  const { data } = await axios.get(`users`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(),
  });
};
