"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
      // Cambiamos 0.0.0.0 por localhost o la dirección IP correcta
      const response = await fetch("http://localhost:8000/api/auth/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Añadimos este header para permitir credenciales en solicitudes cross-origin
          "Access-Control-Allow-Credentials": "true",
        },
        // Añadimos esta opción para enviar cookies si es necesario
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
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
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
              className="h-6 w-6"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M8 17V10" />
              <path d="M12 17V7" />
              <path d="M16 17V13" />
            </svg>
            <Link href="/" className="text-xl font-bold">
              BatMonitor
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-900 hover:text-gray-600">
              Inicio
            </Link>
            <Link href="/caracteristicas" className="text-gray-900 hover:text-gray-600">
              Características
            </Link>
            <Link href="/acerca-de" className="text-gray-900 hover:text-gray-600">
              Acerca de
            </Link>
          </nav>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
                <p className="mt-2 text-gray-600">Ingresa tus credenciales para acceder a tu cuenta</p>
              </div>

              {loginError && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-start">
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
                      <p className="text-sm text-red-700">{loginError}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Nombre de usuario
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.username ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-black hover:text-gray-800">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </button>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 sm:px-10">
              <p className="text-sm text-center text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="font-medium text-black hover:text-gray-800">
                  Regístrate ahora
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
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
                className="h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 17V10" />
                <path d="M12 17V7" />
                <path d="M16 17V13" />
              </svg>
              <span className="font-bold">BatMonitor</span>
            </div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} BatMonitor. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

