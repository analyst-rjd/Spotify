import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";

const TopBar = () => {
  const { admin } = useAuthStore();
  console.log(admin);
  return (
    <div className="flex overflow-hidden items-center rounded-lg justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex items-center gap-2">
        <img src="/spotify.png" className="w-8 h-8" alt="spotify" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {admin && (
          <Link
            to={"/admin"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "flex items-center gap-2 group rounded-md bg-black",
              })
            )}
          >
            <LayoutDashboardIcon className="size-4 mr-2 " />
            <p className="text-sm">Admin Dasboard</p>
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
