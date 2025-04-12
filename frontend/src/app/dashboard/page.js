"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
    verifySession(token)
  }, [])

  const verifySession = async (token) => {
    setIsLoading(true)
    try {
      const verifyResponse = await fetch("http://localhost:8000/api/auth/token/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (!verifyResponse.ok) {
        const newToken = await refreshAccessToken()
        if (!newToken) {
          throw new Error("Sesión expirada")
        }
        token = newToken
      }

      setUser({ username: "Usuario", isAuthenticated: true })
    } catch (error) {
      console.error("Error al verificar la sesión:", error)
      setError("No se pudo verificar la sesión. Por favor, inicia sesión nuevamente.")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      setTimeout(() => router.push("/login"), 2000)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) return null

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

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Cargando...</div>
  }

  if (error) {
    return <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">{error}</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido</h1>
      <p className="text-gray-600">Gestione sus datos desde aquí.</p>
    </div>
  )
}