import TopBar from "@/components/TopBar";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores/musicStore";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";

const formatduration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const params = useParams();
  const albumid = params.albumid;
  const { album, isLoading, fetchAlbumbyId } = useStore();

  useEffect(() => {
    if (albumid) {
      fetchAlbumbyId(albumid);
    }
  }, [albumid, fetchAlbumbyId]);

  console.log(album);

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-full flex  flex-col overflow-y-auto ">
      <TopBar />
      <div className="min-w-full max-w-full h-full overflow-y-auto overflow-x-auto rounded-lg">
        <ScrollArea className="w-full h-[calc(100vh-64px)]  overflow-x-auto overflow-y-auto">
          <div className="relative h-full">
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="flex p-6 gap-6 pb-8">
                <img
                  src={album?.imageUrl}
                  alt={album?.title}
                  className="w-[240px] h-[240px] rounded-md shadow-xl"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium pl-2 text-white">Album</p>
                  <h2 className="text-7xl font-bold my-4">{album?.title}</h2>
                  <div className="flex items-center text-sm gap-2 pl-2">
                    <span className="font-medium text-white">
                      {album?.artist}
                    </span>
                    <span>• &nbsp; {album?.songs.length}</span>
                    <span>• &nbsp; {album?.releaseYear}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-4 flex items-center gap-6">
                <Button
                  size="icon"
                  className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
                >
                  <Play className="size-7 text-black" />
                </Button>
              </div>
              <div className="bg-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <div>#</div>
                  <div>Title</div>
                  <div>Released Date</div>
                  <div>
                    <Clock className="size-4" />
                  </div>
                </div>
                <div className="px-6 space-y-2 py-4 overflow-y-auto">
                  <div className="space-y-2 py-4">
                    {album?.songs.map((song, index) => (
                      <div
                        key={song._id}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                      >
                        <div className="flex items-center justify-center">
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                          <Play className="size-4 hidden group-hover:block" />
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10 rounded-md"
                          />
                          <div className="font-medium text-white">
                            {song.artist}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatduration(song.duration)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AlbumPage;
