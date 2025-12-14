import { useSuspenseQuery } from "@tanstack/react-query";
import { messageQueryOptions } from "../../store/server/message/query";
import { Route } from "../../routes/_authenticated/users/$userId";
import { getUserByIdOptions } from "../../store/server/user/query";
import { useSocketStore } from "../../store/client/socket";
import MessageData from "./components/message-data";

const UserComponent = () => {
  const { userId } = Route.useParams();
  const { data: message } = useSuspenseQuery(messageQueryOptions(userId));
  const { data: user } = useSuspenseQuery(getUserByIdOptions(userId));
  const { onlineUsers } = useSocketStore();

  const mess = message.data.message?.map((item) => ({
    senderId: item.senderId,
    receiverId: item.receiverId,
    message: item.message,
  }));

  return (
    <div>
      <div className=" p-2 bg-gray-50">
        <div className=" gap-2 flex items-center">
          <img
            src={user.data.avatar}
            alt="avatar"
            className=" w-10 h-10 rounded-full "
          />
          <div>
            <p className=" font-semibold ">{user.data.username}</p>
            <p className=" text-[12px]  ">
              {onlineUsers.includes(user.data._id) ? "Active" : "Offline"}
            </p>
          </div>
        </div>
      </div>
      <div className=" p-2">
        <MessageData message={mess} userId={userId} />
      </div>
    </div>
  );
};

export default UserComponent;
