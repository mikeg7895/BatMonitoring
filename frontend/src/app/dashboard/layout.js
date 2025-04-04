"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, FolderDot, BarChart2, Users, Settings, Plus, LogOut } from "lucide-react"
import { useState } from "react"
import { logout } from "@/utils/auth" // Asegúrate de que la ruta sea correcta

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => pathname === path

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">BatMonitor</h1>
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Menú de usuario</span>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="mr-2 h-5 w-5" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-700">Navegación</h2>
          </div>
          <nav className="space-y-1 px-2">
            <Link href="/dashboard" className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/dashboard") ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"}`}>
              <Home className="mr-3 h-5 w-5" /> Inicio
            </Link>
            <Link href="/dashboard/proyectos" className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/dashboard/proyectos") ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"}`}>
              <FolderDot className="mr-3 h-5 w-5" /> Proyectos
            </Link>
            <Link href="/dashboard/analisis" className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/dashboard/analisis") ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"}`}>
              <BarChart2 className="mr-3 h-5 w-5" /> Análisis
            </Link>
            <Link href="/dashboard/equipo" className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/dashboard/equipo") ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"}`}>
              <Users className="mr-3 h-5 w-5" /> Equipo
            </Link>
            <Link href="/dashboard/configuracion" className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${isActive("/dashboard/configuracion") ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"}`}>
              <Settings className="mr-3 h-5 w-5" /> Configuración
            </Link>
          </nav>

          <div className="mt-8 px-4">
            <button className="flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
