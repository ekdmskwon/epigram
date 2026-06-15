"use client";

import { useAuth } from "@/contexts/AuthContext";
import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";

export default function AuthHeader() {
  const { isLoggedIn, userName, profileImageUrl } = useAuth();

  if (isLoggedIn) {
    return (
      <UserHeader
        userName={userName}
        profileImageUrl={profileImageUrl ?? undefined}
      />
    );
  }

  return <GuestHeader />;
}
