import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const syncAttempted = useRef(false);

const AuthCallbackPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const authCallback = async () => {
      try {
        if (!isLoaded || !user || syncAttempted.current) return;
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
        syncAttempted.current = true;
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        navigate("/");
      }
    };
    authCallback();
  }, [isLoaded, user, navigate]);
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <Card className="max-w-md w-[90%] bg-zinc-900 border-zinc-700">
        <CardContent className="flex flex-col gap-4 pt-6 items-center">
          <Loader className="text-emerald-700 size-8 animate-spin" />
          <h3 className="text-xl text-zinc-400 font-bold">Signing you in</h3>
          <p className="text-md text-zinc-400">Redirecting..</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
