import { useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/home/HomePage";
import ChatPage from "@/pages/chat/ChatPage";
import AlbumPage from "@/pages/album/AlbumPage";
import AdminPage from "@/pages/admin/AdminPage";
import NotFoundPage from "@/pages/404/NotFoundPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useAuthStore } from "./stores/useAuthStore";
import Profile from "./pages/profile/Profile";

function App() {
  const { isAuth, isAdmin, refreshToken } = useAuthStore();

  const stableRefreshToken = useCallback(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    const fourMinutes = 240000;

    const intervalId = setInterval(stableRefreshToken, fourMinutes);

    return () => clearInterval(intervalId);
  }, [stableRefreshToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuth ? <MainLayout /> : <Login />} />

        <Route
          path="/register"
          element={isAuth ? <MainLayout /> : <Register />}
        />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/chat" element={<ChatPage />} />

          <Route path="/albums/:albumId" element={<AlbumPage />} />

          <Route path="*" element={<NotFoundPage />} />
          
          <Route path="/profile/:userId" element={!isAuth ? <Login /> : <Profile />} />
        </Route>

        <Route
          path="/admin"
          element={isAuth && isAdmin ? <AdminPage /> : <MainLayout />}
        />

      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
