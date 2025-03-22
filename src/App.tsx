import { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import SettingPage from "./pages/settings/SettingPage";
import { SearchResult } from "./pages/search/SearchResults";
import AdminDashboardPage from "./pages/admin/adminDashboard/AdminDashboardPage";
import AdminLayout from "./layout/AdminLayout";
import { AlbumManagementPage } from "./pages/admin/albumManagement/AlbumManagementPage";
import { ArtistApplicationManagementPage } from "./pages/admin/artistApplicationManagement/ArtistApplicationManagementPage";
import { ArtistManagementPage } from "./pages/admin/artistManagement/ArtistManagementPage";
import { SongManagementPage } from "./pages/admin/songManagement/SongManagementPage";
import { UserManagementPage } from "./pages/admin/userManagement/UserManagementPage";
import PrivateRoute from "./pages/auth/components/PrivateRoute";
import AuthRoute from "./pages/auth/components/AuthRoute";
import AdminRoute from "./pages/auth/components/AdminRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import SongDetails from "./pages/song/SongDetails";
import AlbumDetails from "./pages/album/AlbumDetails";

function App() {
  const { isAuth, refreshToken } = useAuthStore();

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
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/verify-otp" element={<OTPVerificationPage />} />

          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/search" element={<SearchResult />} />

          <Route path="/song-detail/:songId" element={<SongDetails />} />

          <Route path="/album-detail/:albumId" element={<AlbumDetails />} />

          <Route element={<PrivateRoute />}>
            <Route path="/chat" element={<ChatPage />} />

            <Route path="/albums/:albumId" element={<AlbumPage />} />

            <Route path="/profile/:userId" element={<ProfilePage />} />

            <Route path="/settings" element={<SettingPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<AdminRoute />}>
            <Route index element={<AdminDashboardPage />} />

            <Route path="user-management" element={<UserManagementPage />} />

            <Route path="search" element={<SearchResult />} />

            <Route
              path="artist-management"
              element={<ArtistManagementPage />}
            />

            <Route path="song-management" element={<SongManagementPage />} />

            <Route path="album-management" element={<AlbumManagementPage />} />

            <Route
              path="artist-application-management"
              element={<ArtistApplicationManagementPage />}
            />

            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </Router>
  );
}

export default App;
