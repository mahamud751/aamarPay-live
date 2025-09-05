"use client";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { Notification } from "../types/Types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(WS_URL, {
    transports: ["websocket"],
    auth: {
      token: Cookies.get("authToken"),
    },
  });

  socket.on("connect", () => {
    console.log("Connected to WebSocket");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket");
  });

  return socket;
};

export const subscribeToNotifications = (
  callback: (notification: Notification) => void
): void => {
  if (!socket) {
    initSocket();
  }

  socket!.on("notification", callback);
};

export const unsubscribeFromNotifications = (): void => {
  if (socket) {
    socket.off("notification");
  }
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
