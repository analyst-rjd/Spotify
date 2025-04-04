import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { Songs } from "@/types";

type SectionGridProps = {
  title: string;
  songs: Songs[];
  isLoading: boolean;
};
const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between ">
        <h2 className="text-xl sm:text-2xl font-bold ">{title}</h2>
        <Button
          variant="link"
          className="text-sm sm:text-base text-gray-600 hover:text-gray-400"
        >
          Show all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className=" rounded-md hover:bg-zinc-700/40 gap-3 bg-zinc-800/40 transition-all cursor-pointer p-2"
          >
            <div className="relative mb-4">
              <div className="aspect-square round-md shadow-lg overflow-hidden">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <h3 className="font-medium mb-1 truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        ))}
        {/*Add To do */}              
      </div>
    </div>
  );
};

export default SectionGrid;
