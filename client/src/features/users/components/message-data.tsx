import { useEffect, useState } from "react";
import { useBoundStore } from "../../../store/client/use-store";
import { useSocketStore } from "../../../store/client/socket";
import { useSendMessage } from "../../../store/server/message/mutation";
import IconSend from "../../../assets/icon/IconSend";

interface messageProps {
  senderId: string;
  receiverId: string;
  message: string;
}

const MessageData = ({
  message,
  userId,
}: {
  message: messageProps[];
  userId: string;
}) => {
  const { user: u } = useBoundStore();
  const { socket } = useSocketStore();
  const send = useSendMessage();

  // react state hook
  const [sendData, setSendData] = useState("");
  const [messageData, setMessageData] = useState<messageProps[]>(message);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data: messageProps) => {
      //   if (data.senderId === u.id) return;
      setMessageData((prev) => [
        ...prev,
        {
          receiverId: data.receiverId,
          message: data.message,
          senderId: data.senderId,
        },
      ]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, u.id]);

  const handleSendMessage = () => {
    send.mutate(
      { message: sendData, receiverId: userId },
      {
        onSuccess: (data) => {
          setMessageData((prev) => [
            ...prev,
            {
              receiverId: data?.data.receiverId,
              message: data?.data?.message,
              senderId: data?.data?.senderId,
            },
          ]);
          setSendData("");
        },
      }
    );
  };

  return (
    <div>
      <div className=" h-[75vh] overflow-y-scroll ">
        {messageData.map((item, idx) => (
          <div
            key={idx}
            className={` mt-2 flex ${
              u.id == item.senderId ? "justify-end" : "justify-start"
            }   `}
          >
            <span className=" bg-gray-100 text-sm  font-medium p-2 rounded-md ">
              {item.message}
            </span>
          </div>
        ))}
      </div>

      <div className=" h-10 absolute bottom-0 left-0 w-full bg-gray-200">
        <div className=" flex items-center">
          <input
            value={sendData}
            onChange={(e) => setSendData(e.target.value)}
            placeholder="Write a message"
            className=" text-sm  text-slate-700 h-10 hover:outline-none focus:outline-none pl-2  w-full"
          />
          <div onClick={handleSendMessage} className=" cursor-pointer pr-2">
            <IconSend className=" text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageData;
