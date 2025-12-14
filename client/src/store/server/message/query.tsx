import { queryOptions } from "@tanstack/react-query";
import { authJsonToken, axios } from "../../../api";
import type { GetMessageResponse } from "./typed";

const getMessage = async (id: string): Promise<GetMessageResponse> => {
  const { data } = await axios.get(`message`, {
    headers: authJsonToken(),
    params: {
      receiverId: id,
    },
  });
  return data;
};

export const messageQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["message"],
    queryFn: () => getMessage(id),
  });
