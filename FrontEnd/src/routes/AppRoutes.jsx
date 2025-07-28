"use client"

import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import Verify from "../pages/Verify"
import Home from "../pages/Home"
import ChangePassword from "../pages/ChangePassword"
import UserManagement from "../components/admin/UserManagement"
import HealthRecords from "../components/admin/HealthRecords"
import ContentManagement from "../components/admin/ContentManagement"
import MedicineManagement from "../components/admin/MedicineManagement"
import MedicalEvents from "../components/admin/MedicalEvents"
import VaccinationManagement from "../components/admin/VaccinationManagement"
import MedicalCheckups from "../components/admin/MedicalCheckups"
import MedicalHistory from "../components/admin/MedicalHistory"
import SystemManagement from "../components/admin/SystemManagement"
import Reports from "../components/admin/Reports"
import api from "../api/axios"
import { getToken, removeTokens } from "../utils/auth"
import LoadingSpinner from "../components/LoadingSpinner"
import Blog from "../pages/Blog"
import Contact from "../pages/Contact"
import Documents from "../pages/Documents"
import HealthRecordParent from "../pages/parent/HealthRecordParent"
import MedicalSendParent from "../pages/parent/MedicalSendParent"
import ListMedicalSendNurse from "../pages/nurse/ListMedicalSendNurse"
import ListHealthRecordNurse from "../pages/nurse/ListHealthRecordNurse"
import EventInSchoolNurse from "../pages/nurse/EventInSchoolNurse"
import EventInSchoolParent from "../pages/parent/EventInSchoolParent"
import WarehouseNurse from "../pages/nurse/WarehouseNurse"
import StudentManagement from "../components/admin/StudentManagement"
import VaccinationParent from "../pages/parent/VaccinationParent"
import VaccinationNurse from "../pages/nurse/VaccinationNurse"
import HealthCheckupParent from "../pages/parent/HealthCheckupParent"
import HealthCheckupNurse from "../pages/nurse/HealthCheckupNurse"
import ClassesManagement from "../components/admin/ClassesManagement"
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/documents" element={<Documents />} />

        
        
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
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <PrivateRoute>
              <ClassesManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <PrivateRoute>
              <StudentManagement />
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
        <Route
          path="/admin/content"
          element={
            <PrivateRoute>
              <ContentManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/medicines"
          element={
            <PrivateRoute>
              <MedicineManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/medical-events"
          element={
            <PrivateRoute>
              <MedicalEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/vaccinations"
          element={
            <PrivateRoute>
              <VaccinationManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/medical-checkups"
          element={
            <PrivateRoute>
              <MedicalCheckups />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/medical-history"
          element={
            <PrivateRoute>
              <MedicalHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/system"
          element={
            <PrivateRoute>
              <SystemManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        {/* Parent Routes */}
        <Route
          path="/parent/health-record"
          element={
            <PrivateRoute>
              <HealthRecordParent />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/medical-send-history"
          element={
            <PrivateRoute>
              <MedicalSendParent />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/event-in-school"
          element={
            <PrivateRoute>
              <EventInSchoolParent />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/medical-vaccine"
          element={
            <PrivateRoute>
              <VaccinationParent />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/health-checkup"
          element={
            <PrivateRoute>
              <HealthCheckupParent />
            </PrivateRoute>
          }
        />
        {/* Nurse Routes */}
        <Route
          path="/nurse/list-medical-send"
          element={
            <PrivateRoute>
              <ListMedicalSendNurse />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/list-health-records"
          element={
            <PrivateRoute>
              <ListHealthRecordNurse />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/event-in-school"
          element={
            <PrivateRoute>
              <EventInSchoolNurse />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/warehouse"
          element={
            <PrivateRoute>
              <WarehouseNurse />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/vaccination"
          element={
            <PrivateRoute>
              <VaccinationNurse />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/health-checkup"
          element={
            <PrivateRoute>
              <HealthCheckupNurse />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}
