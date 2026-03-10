import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WS_URL ?? import.meta.env.VITE_API_URL);

type WebSocketHandlers = {
  onThemeCreated?: () => void;
  onThemeUpdated?: () => void;
  onThemeDeleted?: () => void;
  onCardCreated?: () => void;
  onCardUpdated?: () => void;
  onCardDeleted?: () => void;
};

export function useWebSocket(handlers: WebSocketHandlers) {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    socket.on("connect", () => console.log("Conectado:", socket.id));
    socket.on("theme-created", () => handlersRef.current.onThemeCreated?.());
    socket.on("theme-updated", () => handlersRef.current.onThemeUpdated?.());
    socket.on("theme-deleted", () => handlersRef.current.onThemeDeleted?.());
    socket.on("card-created",  () => handlersRef.current.onCardCreated?.());
    socket.on("card-updated",  () => handlersRef.current.onCardUpdated?.());
    socket.on("card-deleted",  () => handlersRef.current.onCardDeleted?.());

    return () => {
      socket.off("connect");
      socket.off("theme-created");
      socket.off("theme-updated");
      socket.off("theme-deleted");
      socket.off("card-created");
      socket.off("card-updated");
      socket.off("card-deleted");
    };
  }, []);
}