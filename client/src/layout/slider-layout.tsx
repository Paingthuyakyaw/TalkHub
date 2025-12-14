import { useNavigate } from "@tanstack/react-router";
import { useSocketStore } from "../store/client/socket";
import { useGetAllUser } from "../store/server/user/query";
import { useBoundStore } from "../store/client/use-store";

const SliderLayout = () => {
  const online = useSocketStore((s) => s.onlineUsers);
  const { setReceiver } = useBoundStore();

  const { data } = useGetAllUser();

  const navigate = useNavigate();

  return (
    <div className=" px-3 pt-5">
      {data?.data.map((da) => (
        <div key={da._id} className=" w-full  bg-white rounded-md">
          <div
            onClick={() => {
              navigate({ to: `/users/${da._id}` });
              setReceiver({ username: da.username, avatar: da.avatar });
            }}
            className=" p-2 flex items-center gap-2"
          >
            <div className="">
              <div className=" relative w-10 h-10 bg-black rounded-full ">
                {online.includes(da._id) ? (
                  <div className=" absolute w-3 h-3 bg-green-600 rounded-full bottom-0 right-0 "></div>
                ) : (
                  <div className=" absolute w-3 h-3 bg-gray-600 rounded-full bottom-0 right-0 "></div>
                )}
              </div>
            </div>
            <div className=" flex flex-col">
              <p className=" text-slate-800 font-semibold ">{da.username}</p>
              <p className=" text-gray-600 text-[13px]">{da.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SliderLayout;
