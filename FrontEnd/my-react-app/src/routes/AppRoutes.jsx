"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import Verify from "../pages/Verify"
import Home from "../pages/Home"
import ChangePassword from "../pages/ChangePassword"
import UserManagement from "../pages/admin/UserManagement"
import HealthRecords from "../pages/admin/HealthRecords"
import api from "../api/axios"
import { getToken, removeTokens } from "../utils/auth"
import LoadingSpinner from "../components/LoadingSpinner"

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()

      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      try {
        // Gọi API để kiểm tra token có hợp lệ không (có thể là endpoint profile hoặc user info)
        await api.get("/v1/profile")
        setIsAuthenticated(true)
      } catch {
        // Nếu token không hợp lệ, xóa token và redirect
        removeTokens()
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/health-records"
          element={
            <PrivateRoute>
              <HealthRecords />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}
