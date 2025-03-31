import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/stores/musicStore";

const LeftSidebar = () => {
  const { albums, isLoading, fetchAlbums } = useStore();
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  console.log({ albums });
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="rounded-lg bg-zinc-900 p-4 items-center">
        <div className="space-y-2 align-center">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="size-4 mr-2" />
            <p className="hidden md:inline">Home</p>
          </Link>
          <SignedIn>
            <Link
              to="/messages"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="size-4 mr-2" />

              <p className="hidden md:inline">Messages</p>
            </Link>
          </SignedIn>
        </div>
      </div>
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <p className="hidden md:inline">Library</p>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? <PlaylistSkeleton /> : albums.map((album) => (
              <Link
                key={album.id}
                to={`/albums/${album.id}`}
                className="flex items-center p-2 text-sm font-semibold leading-6 text-zinc-400 hover:bg-zinc-800 rounded-md"
              >
                {album.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
