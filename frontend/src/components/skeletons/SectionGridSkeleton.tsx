const SectionGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 mt-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-2 rounded-md flex items-center gap-3 bg-zinc-900"
        >
          <div className="w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 animate-pulse" />
          <div className="flex-1 min-w-0 hidden md:block space-y-2">
            <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionGridSkeleton;
