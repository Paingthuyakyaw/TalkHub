import { useMutation } from "@tanstack/react-query";
import { authJsonToken, axios } from "../../../api";

interface payloadProps {
  message: string;
  receiverId: string;
}

const sendMessage = async (payload: payloadProps) => {
  const { data } = await axios.post(`message/send`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload: payloadProps) => sendMessage(payload),
    onSuccess: () => {},
  });
};
