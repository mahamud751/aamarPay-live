"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getNotifications,
  updateNotificationStatus,
} from "@/services/apis/notifications";
import {
  subscribeToNotifications,
  unsubscribeFromNotifications,
} from "@/services/lib/sockets";
import { Notification } from "@/services/types/Types";
import { useAuth } from "./hooks/auth";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread"
  ).length;

  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await getNotifications(1, 50, user.email);
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      const updatedNotification = await updateNotificationStatus(id, {
        status: "read",
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? updatedNotification : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(
        (notification) => notification.status === "unread"
      );

      const updatedNotifications = await Promise.all(
        unreadNotifications.map((notification) =>
          updateNotificationStatus(notification.id, { status: "read" })
        )
      );

      setNotifications((prev) =>
        prev.map((notification) => {
          const updated = updatedNotifications.find(
            (updatedNotification) => updatedNotification.id === notification.id
          );
          return updated ? updated : notification;
        })
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();

      subscribeToNotifications((notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      return () => {
        unsubscribeFromNotifications();
      };
    }
  }, [user, fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
