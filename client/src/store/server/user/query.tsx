import { queryOptions, useQuery } from "@tanstack/react-query";
import { authJsonToken, axios } from "../../../api";
import type { userResponseById, userResponseProps } from "./typed";

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

const getUserById = async (id: string): Promise<userResponseById> => {
  const { data } = await axios.get(`users/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const getUserByIdOptions = (id: string) => {
  return queryOptions({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
  });
};
