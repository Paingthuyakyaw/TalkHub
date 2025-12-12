import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[]; // online userId list

  connectSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (userId: string) => {
    // prevent double connection
    if (get().socket) return;

    const socket: Socket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId },
    });

    // Listen online user list event
    socket.on("online", (users: string[]) => {
      console.log({ users });

      set({ onlineUsers: users });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;

    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
