import TopBar from "@/components/TopBar";
import { useStore } from "@/stores/musicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const {
    featuredSongs,
    trendingSongs,
    madeForYouSongs,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
  } = useStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]);

  return (
    <div>
      <TopBar />
      <div className="h-full rounded-md overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-800 mt-2 ">
        <ScrollArea className="h-[calc(100vh-64px)] sm:overflow-y-scroll md:overflow-y-auto">
          <div className="p-4 sm:p-6">
            <h1 className="text-3xl font-bold">Good afternoon</h1>
            <FeaturedSection />

            <div className="space-y-8">
              <SectionGrid
                title="Made for You"
                songs={madeForYouSongs}
                isLoading={isLoading}
              />
              <SectionGrid
                title="Trending"
                songs={trendingSongs}
                isLoading={isLoading}
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomePage;
