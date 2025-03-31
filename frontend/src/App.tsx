import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.tsx";
import MainSidebar from "./layout/MainLayout.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<MainSidebar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
