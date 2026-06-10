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
    const handleConnect = () => console.log("Conectado:", socket.id);
    const handleThemeCreated = () => handlersRef.current.onThemeCreated?.();
    const handleThemeUpdated = () => handlersRef.current.onThemeUpdated?.();
    const handleThemeDeleted = () => handlersRef.current.onThemeDeleted?.();
    const handleCardCreated = () => handlersRef.current.onCardCreated?.();
    const handleCardUpdated = () => handlersRef.current.onCardUpdated?.();
    const handleCardDeleted = () => handlersRef.current.onCardDeleted?.();

    socket.on("connect", handleConnect);
    socket.on("theme-created", handleThemeCreated);
    socket.on("theme-updated", handleThemeUpdated);
    socket.on("theme-deleted", handleThemeDeleted);
    socket.on("card-created", handleCardCreated);
    socket.on("card-updated", handleCardUpdated);
    socket.on("card-deleted", handleCardDeleted);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("theme-created", handleThemeCreated);
      socket.off("theme-updated", handleThemeUpdated);
      socket.off("theme-deleted", handleThemeDeleted);
      socket.off("card-created", handleCardCreated);
      socket.off("card-updated", handleCardUpdated);
      socket.off("card-deleted", handleCardDeleted);
    };
  }, []);
}
