import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/chatStore";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {
  const { users, isLoading, error, fetchUsers } = useChatStore();
  const { user } = useUser();
  useEffect(() => {
    if (user) fetchUsers();
    else console.log("User not logged in");
  }, [fetchUsers]);
  const isPlaying = true;

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col overflow-x-hidden">
      <div className="flex justify-between items-center p-4 border-b border-zinc-800 sticky top-1.5 z-10 bg-zinc-900/75 backdrop-blur-md">
        <div className="flex items-center gap-3 rounded-lg">
          <Users className="size-5 shrink-0" />
          <h2 className="text-lg font-bold text-zinc-100">
            What they're listening to
          </h2>
        </div>
      </div>
      {!user && <LoginPrompt />}
      <ScrollArea className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="cursor-pointer hover:bg-zinc-800 p-3 rounded-md transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10 border border-zinc-800">
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback className="bg-zinc-800">
                      {user.fullName[0]?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={
                      "absolute bottom-0 right-0 w-3 h-3 border-2 border-zinc-900 rounded-full"
                    }
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-white">
                      {user.fullName}
                    </span>
                    {isPlaying && (
                      <Music className="size-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  {isPlaying ? (
                    <div>
                      <div className="text-sm mt-1 text-white font-medium truncate">
                        Cardigan
                      </div>
                      <div className="text-xs text-zinc-400 truncate">
                        by Taylor Swift
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-zinc-400">Idle</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;

const LoginPrompt = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4 ">
      <div className="relative">
        <div
          className="absolute -inset-1  bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg animate-pulse opacity-75"
          aria-hidden="true"
        />
        <div className="relative bg-zinc-900 rounded-full p-4 ">
          <HeadphonesIcon className="size-8 text-emerald-400" />
        </div>
      </div>
      <div className="space-y-2 max-w-[250px]">
        <h3 className="text-lg font-semibold text-white">
          See What Friends Are Playing
        </h3>
        <p className="text-sm text-zinc-400">
          Connect your account to see what friends are listening to.
        </p>
      </div>
    </div>
  );
};
