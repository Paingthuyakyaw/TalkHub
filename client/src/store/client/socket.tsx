import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];

  connectSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (userId: string) => {
    if (get().socket) return;
    const socket: Socket = io(import.meta.env.VITE_SOCKET_URL, {
      query: { userId },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    console.log("connect socket");

    // Listen online user list event
    socket.on("online", (users: string[]) => {
      console.log(users);

      set({ onlineUsers: users });
    });
    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      console.log("disconnect socket");

      set({ socket: null, onlineUsers: [] });
    }
  },
}));
