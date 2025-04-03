import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import { useMediaQuery } from "react-responsive";
import FriendsActivity from "@/layout/FriendsActivity";

const MainSidebar = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full p-2 overflow-hidden"
      >
        <ResizablePanel
          defaultSize={isMobile ? 15 : 20}
          minSize={8}
          maxSize={25}
          className="min-w-[70px]"
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
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainSidebar;
