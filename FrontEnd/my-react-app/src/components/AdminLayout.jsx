"use client"

import { useState } from "react"
import AdminSidebar from "./AdminSidebar"

function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
      >
        {/* Content area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
