import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const TopBar = () => {
  const isAdmin = false;
  return (
    <div className="flex overflow-hidden items-center rounded-lg justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex items-center gap-2">Spotify</div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dasboard
          </Link>
        )}

        <SignedIn>
          <p
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  "w-full items-center justify-start text-white hover:bg-zinc-800 rounded-2xl",
              })
            )}
          >
            <SignOutButton />
          </p>
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default TopBar;
