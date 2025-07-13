"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
import HealthRecord from "../pages/parent/HealthRecord"
import MedicalSend from "../pages/parent/MedicalSend"
import ListMedicalSend from "../pages/nurse/ListMedicalSend"
import ListHealthRecord from "../pages/nurse/ListHealthRecord"
import EventInSchool from "../pages/nurse/EventInSchool"
import EventInSchoolForm from "../pages/parent/EventInSchool"
import Warehouse from "../pages/nurse/WareHouse"
import StudentManagement from "../components/admin/StudentManagement"
import Vaccination from "../pages/parent/Vaccination"
import VaccinationNurse from "../pages/nurse/Vaccination"
import HealthCheckup from "../pages/parent/HealthCheckup"
import HealthCheckupNurse from "../pages/nurse/HealthCheckup"
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
              <HealthRecord />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/medical-send-history"
          element={
            <PrivateRoute>
              <MedicalSend />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/event-in-school"
          element={
            <PrivateRoute>
              <EventInSchoolForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/medical-vaccine"
          element={
            <PrivateRoute>
              <Vaccination />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/health-checkup"
          element={
            <PrivateRoute>
              <HealthCheckup />
            </PrivateRoute>
          }
        />
        {/* Nurse Routes */}
        <Route
          path="/nurse/list-medical-send"
          element={
            <PrivateRoute>
              <ListMedicalSend />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/list-health-records"
          element={
            <PrivateRoute>
              <ListHealthRecord />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/event-in-school"
          element={
            <PrivateRoute>
              <EventInSchool />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurse/warehouse"
          element={
            <PrivateRoute>
              <Warehouse />
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
