// Función para refrescar el token de acceso
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken")

  if (!refreshToken) {
    return null
  }

  try {
    const response = await fetch("http://localhost:8000/api/auth/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Añadimos esta línea
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem("accessToken", data.access)
      return data.access
    } else {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      return null
    }
  } catch (error) {
    console.error("Error al refrescar el token:", error)
    return null
  }
}

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken")
}

// Función para obtener el token de acceso
export const getAccessToken = () => {
  return localStorage.getItem("accessToken")
}

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

// Función para realizar peticiones autenticadas
export const fetchWithAuth = async (url, options = {}) => {
  const token = getAccessToken()

  if (!token) {
    return { error: "No hay sesión activa" }
  }

  // Configurar headers con el token
  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }

  try {
    let response = await fetch(url, authOptions)

    // Si el token expiró, intentamos refrescarlo
    if (response.status === 401) {
      const newToken = await refreshAccessToken()

      if (!newToken) {
        return { error: "Sesión expirada" }
      }

      // Actualizamos el token en los headers y reintentamos
      authOptions.headers.Authorization = `Bearer ${newToken}`
      response = await fetch(url, authOptions)
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        error: errorData.detail || `Error ${response.status}: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error en la petición:", error)
    return { error: "Error de conexión" }
  }
}

