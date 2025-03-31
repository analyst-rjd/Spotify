import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import { useMediaQuery } from "react-responsive";

const MainSidebar = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full p-2 overflow-hidden"
      >
        <ResizablePanel
          defaultSize={isMobile ? 10 : 20}
          minSize={isMobile ? 10 : 20}
          maxSize={isMobile ? 10 : 20}
        >
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="bg-black rounded-lg transition-colors w-2" />
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="bg-black rounded-lg transition-colors w-2" />
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          Friends
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainSidebar;
