"use client";

import { useAppToasts } from "@/hooks/use-app-toast";
import { NotificationPayloadType } from "@/types/global.types";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  userId: string;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  userId: "",
});

export const useSocketContext = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
  userId: string;
}

const SocketProvider = ({ children, userId }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { SuccessToast } = useAppToasts();

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
    });

    socketInstance.on("connect", () => {
      console.log(`✅ Connected to Socket.IO server as ${userId}`);
      SuccessToast({
        title: "Connected to digilab server",
      });
      socketInstance.emit("joinUserRoom", userId);
    });

    setSocket(socketInstance);

    socketInstance.on("notification", (payload: NotificationPayloadType) => {
      SuccessToast({
        title: payload.message,
      });
    });

    socketInstance.on("disconnect", (reason) => {
      console.log(`🛑 Disconnected: ${reason}`);
    });

    return () => {
      socketInstance.disconnect();
      console.log("🛑 Socket disconnected (cleanup)");
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, userId }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
