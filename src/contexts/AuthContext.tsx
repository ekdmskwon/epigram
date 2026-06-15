"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getUserMe } from "@/api/user";
import {
  getAccessToken,
  getUserProfile,
  setUserProfile,
} from "@/lib/auth-token";

type AuthContextValue = {
  isLoggedIn: boolean;
  userName: string;
  profileImageUrl: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);

    if (!token) return;

    const cachedProfile = getUserProfile();
    if (cachedProfile.nickname) {
      setUserName(cachedProfile.nickname);
    }
    if (cachedProfile.image) {
      setProfileImageUrl(cachedProfile.image);
    }

    getUserMe()
      .then((user) => {
        setUserName(user.nickname);
        setProfileImageUrl(user.image);
        setUserProfile(user.nickname, user.image);
      })
      .catch(() => {
        if (!getAccessToken()) {
          setIsLoggedIn(false);
          setUserName("");
          setProfileImageUrl(null);
        }
      });
  }, []);

  const value = useMemo(
    () => ({ isLoggedIn, userName, profileImageUrl }),
    [isLoggedIn, userName, profileImageUrl],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
