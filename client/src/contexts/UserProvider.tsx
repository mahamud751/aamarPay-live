"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import { User, UserRole } from "@/services/types/Types";
import { handleAxiosError } from "@/services/utils/utils";

const normalizeRedirectUrl = (url?: string): string => {
  if (!url) return "/";
  try {
    const parsedUrl = new URL(url, window.location.origin);
    if (parsedUrl.origin !== window.location.origin) {
      console.warn("Invalid redirect URL: External domains are not allowed.");
      return "/";
    }
    return parsedUrl.pathname || "/";
  } catch {
    return url.startsWith("/") ? url : `/${url}`;
  }
};

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (
    email: string,
    password: string,
    redirectUrl?: string
  ) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    phone: string,
    password: string,
    redirectUrl?: string
  ) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
  googleSignIn: (redirectUrl?: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || null;
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    if (status === "authenticated" && session?.user) {
      const sessionUser: User = {
        id: session.user.id || "",
        name: session.user.name || "Unknown",
        email: session.user.email || "",
        role: (session.user.role as UserRole) || UserRole.User,
        photos: session.user.photos || [],
      };

      const sessionToken = session.accessToken || null;

      setUser(sessionUser);
      setToken(sessionToken);

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(sessionUser));
        if (sessionToken) localStorage.setItem("token", sessionToken);
        Cookies.set("authToken", sessionToken || "", { expires: 1, path: "/" });
      }
    } else if (status === "unauthenticated") {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setUser(null);
        setToken(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          Cookies.remove("authToken");
        }
      }
    }
  }, [session, status, isInitialized]);

  useEffect(() => {
    if (typeof window !== "undefined" && user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

  const loginUser = async (
    email: string,
    password: string,
    redirectUrl?: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
        { email, password }
      );

      if (response.status === 201) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        Cookies.set("authToken", token, { expires: 1, path: "/" });
        router.push(normalizeRedirectUrl(redirectUrl));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err: unknown) {
      await handleAxiosError(err, "Login failed", "Login Error");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    redirectUrl?: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
        { name, email, phone, password }
      );

      if (response.status === 201) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        Cookies.set("authToken", token, { expires: 1, path: "/" });
        router.push(normalizeRedirectUrl(redirectUrl));
      } else {
        throw new Error("Registration failed");
      }
    } catch (err: unknown) {
      await handleAxiosError(err, "Registration failed", "Registration Error");
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = (redirectUrl?: string) => {
    signIn("google", { callbackUrl: normalizeRedirectUrl(redirectUrl) });
  };

  const logoutUser = () => {
    signOut({ callbackUrl: "/" });
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      Cookies.remove("authToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        registerUser,
        logoutUser,
        loading,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
