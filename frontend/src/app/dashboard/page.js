"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/login")
      return
    }

    fetchUserData(token)
  }, [])

  const fetchUserData = async (token) => {
    setIsLoading(true)
    try {
      // Primero verificamos el token
      const verifyResponse = await fetch("http://localhost:8000/api/auth/token/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (!verifyResponse.ok) {
        // Si el token no es válido, intentamos refrescarlo
        const newToken = await refreshAccessToken()
        if (!newToken) {
          throw new Error("Sesión expirada")
        }
        token = newToken
      }

      // Ahora obtenemos los datos del usuario
      // Nota: Asumimos que hay un endpoint para obtener datos del usuario
      const userResponse = await fetch("http://localhost:8000/api/auth/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData)
      } else {
        throw new Error("No se pudieron obtener los datos del usuario")
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error)
      setError("No se pudo cargar la información del usuario. Por favor, inicia sesión nuevamente.")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      setTimeout(() => router.push("/login"), 2000)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken")

    if (!refreshToken) {
      return null
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("accessToken", data.access)
        return data.access
      } else {
        return null
      }
    } catch (error) {
      console.error("Error al refrescar el token:", error)
      return null
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <p className="text-sm text-red-700 mt-2">Redirigiendo al inicio de sesión...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Panel de Control</h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-medium text-gray-900">Actividad Reciente</h4>
                  <p className="mt-1 text-sm text-gray-500">12 detecciones en las últimas 24 horas</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-medium text-gray-900">Dispositivos Activos</h4>
                  <p className="mt-1 text-sm text-gray-500">8 dispositivos conectados</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-black rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-medium text-gray-900">Proyectos</h4>
                  <p className="mt-1 text-sm text-gray-500">3 proyectos activos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h4>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Dispositivo
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ubicación
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Fecha
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Detecciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      Sensor-01
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Parque Nacional</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2025-03-27</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">5</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      Sensor-03
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Reserva Natural</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2025-03-27</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">3</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      Sensor-05
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Cueva del Río</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2025-03-26</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function DashboardLayout({ children, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M8 17V10" />
                  <path d="M12 17V7" />
                  <path d="M16 17V13" />
                </svg>
                <span className="ml-2 text-xl font-bold">BatMonitor</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="border-black text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/mapa"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Mapa
                </Link>
                <Link
                  href="/dashboard/dispositivos"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dispositivos
                </Link>
                <Link
                  href="/dashboard/reportes"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Reportes
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <span className="sr-only">Ver notificaciones</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Abrir menú de usuario</span>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={onLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cerrar sesión
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

