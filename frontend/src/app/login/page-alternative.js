"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio"
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    // Validar formulario
    if (!validateForm()) return

    setIsLoading(true)
    setLoginError("")

    try {
      // Usar nuestro proxy API route para evitar problemas de CORS
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: "/api/auth/token/",
          data: {
            username: formData.username,
            password: formData.password,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("accessToken", data.access)
        localStorage.setItem("refreshToken", data.refresh)
        router.push("/dashboard")
      } else {
        const errorData = await response.json().catch(() => ({}))
        setLoginError(errorData.detail || "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.")
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
      setLoginError(
        "No se pudo conectar con el servidor. Verifica tu conexión a internet o que el servidor esté en funcionamiento.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  // El resto del componente permanece igual...
}

