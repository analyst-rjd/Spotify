import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";

const updateToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        updateToken(token);
      } catch (error: any) {
        updateToken(null);
        console.error("Error fetching token:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [getToken]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="text-emerald-500 size-8 animate-spin" />
      </div>
    );

  return <div>{children}</div>;
};

export default AuthProvider;
