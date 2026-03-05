import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WS_URL ?? import.meta.env.VITE_API_URL)

export function useWebSocket(onUpdate: () => void) {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado:", socket.id);
    });

    socket.on("theme-created", () => {
      onUpdate();
    });

    socket.on("card-created", () => {
      onUpdate();
    });

    return () => {
      socket.off("connect");
      socket.off("theme-created");
      socket.off("card-created");
    };
  }, []);
}