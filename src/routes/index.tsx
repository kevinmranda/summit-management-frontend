import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Pages
import Home from "../pages/Home.tsx";
import Login from "../pages/auth/Login.tsx";
import Register from "../pages/auth/Register.tsx";
import UserDashboard from "../pages/user/Dashboard.tsx";
import Profile from "../pages/user/Profile.tsx";
import SummitPage from "../pages/user/Summit";
import IDCard from "../pages/user/IDCard.tsx";
import AdminDashboard from "../pages/admin/Dashboard.tsx";
import Users from "../pages/admin/Users.tsx";
import Summits from "../pages/admin/Summits.tsx";
import Reports from "../pages/admin/Reports.tsx";
import QRScan from "../pages/admin/QRScan.tsx";
import NotFound from "../pages/NotFound.tsx";
import MealScan from "../components/admin/MealScan.tsx";

// Protected Route wrapper
const ProtectedRoute = ({
  children,
  isAdmin = false,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
}) => {
  const { isAuthenticated, isAdmin: userIsAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (isAdmin) {
    return userIsAdmin ? <>{children}</> : <Navigate to="/user/dashboard" />;
  } else {
    return userIsAdmin ? <Navigate to="/admin/dashboard" /> : <>{children}</>;
  }
};

// Main routing
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* User Routes */}
    <Route
      path="/user/dashboard"
      element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/summit/:year"
      element={
        <ProtectedRoute>
          <SummitPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/idcard"
      element={
        <ProtectedRoute>
          <IDCard />
        </ProtectedRoute>
      }
    />
    {/* Admin Routes */}
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute isAdmin={true}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute isAdmin={true}>
          <Users />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/summits"
      element={
        <ProtectedRoute isAdmin={true}>
          <Summits />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/reports"
      element={
        <ProtectedRoute isAdmin={true}>
          <Reports />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/qr-scan"
      element={
        <ProtectedRoute isAdmin={true}>
          <QRScan />
        </ProtectedRoute>
      }
    />
    <Route path="/meals/scan" element={<MealScan />} />

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
