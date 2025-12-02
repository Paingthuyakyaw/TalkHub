import { useEffect } from "react";
import { useSocketStore } from "./store/client/socket";

const App = () => {
  const { onlineUsers, connectSocket } = useSocketStore();

  useEffect(() => {
    connectSocket("6922ac6f5b095683ec79c84c");
  }, []);

  console.log(onlineUsers);

  return <div>App</div>;
};

export default App;
