import FeaturedSkeleton from "@/components/skeletons/FeaturedSkeleton";
import { useStore } from "@/stores/musicStore";

const FeaturedSection = () => {
  const { featuredSongs, isLoading, error } = useStore();

  if (isLoading) return <FeaturedSkeleton />;
  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-3 mt-2 p-2">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="p-2 rounded-md flex items-center gap-3 bg-zinc-900"
        >
          <div className="w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0">
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-md font-semibold">{song.title}</p>
            <p className="text-sm text-zinc-400">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
