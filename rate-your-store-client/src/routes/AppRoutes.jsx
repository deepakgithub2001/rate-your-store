// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SystemAdminDashboard from "../pages/SystemAdminDashboard";
import StoreOwnerDashboard from "../pages/StoreOwnerDashboard";
import NormalUserDashboard from "../pages/NormalUserDashboard";
import { useAuth } from "../context/AuthContext";
import SignupPage from "../pages/SignupPage.";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminRatingsPage from "../pages/AdminRatingsPage";

function RoleBasedDashboardRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role === "system_admin") return <SystemAdminDashboard />;
  if (user.role === "store_owner") return <StoreOwnerDashboard />;
  if (user.role === "normal_user") return <NormalUserDashboard />;
  return <div>Unknown role.</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="admin/dashboard" element={<SystemAdminDashboard />} />
      <Route path="/store-owner/dashboard" element={<StoreOwnerDashboard />} />
      <Route path="/user/dashboard" element={<NormalUserDashboard />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/ratings" element={<AdminRatingsPage />} />
    </Routes>
  );
}
