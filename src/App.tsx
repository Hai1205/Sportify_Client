import { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserLayout from "@/layout/UserLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import OTPVerificationPage from "./pages/auth/OTPVerificationPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import HomePage from "@/pages/home/HomePage";
import ChatPage from "@/pages/chat/ChatPage";
import AlbumPage from "@/pages/album/AlbumPage";
import NotFoundPage from "@/pages/404/NotFoundPage";
import { useAuthStore } from "./stores/useAuthStore";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingPage from "./pages/settings/SettingPage";
import { SearchResult } from "./pages/search/SearchResults";
import AdminDashboardPage from "./pages/admin/adminDashboard/AdminDashboardPage";
import AdminLayout from "./layout/AdminLayout";
import { AlbumManagementPage } from "./pages/admin/albumManagement/AlbumManagementPage";
import { ArtistApplicationManagementPage } from "./pages/admin/artistApplicationManagement/ArtistApplicationManagementPage";
import { ArtistManagementPage } from "./pages/admin/artistManagement/ArtistManagementPage";
import { SongManagementPage } from "./pages/admin/songManagement/SongManagementPage";
import { UserManagementPage } from "./pages/admin/userManagement/UserManagementPage";

function App() {
  const { isAuth, isAdmin, refreshToken } = useAuthStore();

  const stableRefreshToken = useCallback(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    if (!isAuth) return;

    const fourMinutes = 240000;

    const intervalId = setInterval(stableRefreshToken, fourMinutes);

    return () => clearInterval(intervalId);
  }, [isAuth, stableRefreshToken]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <UserLayout /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={isAuth ? <UserLayout /> : <RegisterPage />}
        />

        <Route
          path="/forgot-password"
          element={isAuth ? <UserLayout /> : <ForgotPasswordPage />}
        />

        <Route
          path="/verify-otp"
          element={isAuth ? <UserLayout /> : <OTPVerificationPage />}
        />

        <Route
          path="/reset-password"
          element={isAuth ? <UserLayout /> : <ResetPasswordPage />}
        />

        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/search" element={<SearchResult />} />

          <Route path="/chat" element={<ChatPage />} />

          <Route path="/albums/:albumId" element={<AlbumPage />} />

          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <LoginPage />}
          />

          <Route
            path="/settings"
            element={isAuth ? <SettingPage /> : <LoginPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/admin"
          element={isAuth && isAdmin ? <AdminLayout /> : <UserLayout />}
        >
          <Route index element={<AdminDashboardPage />} />

          <Route path="user-management" element={<UserManagementPage />} />

          <Route path="search" element={<SearchResult />} />

          <Route path="artist-management" element={<ArtistManagementPage />} />

          <Route path="song-management" element={<SongManagementPage />} />

          <Route path="album-management" element={<AlbumManagementPage />} />

          <Route
            path="artist-application-management"
            element={<ArtistApplicationManagementPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
