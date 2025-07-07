"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppselector } from "@/hooks/store.hooks";
import Loading from "@/components/Loading/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { token } = useAppselector((store) => store.userReducer);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return <Loading />;
  }

  return <>{children}</>;
}