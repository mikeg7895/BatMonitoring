// Este archivo actúa como un proxy para evitar problemas de CORS
export async function POST(request) {
    try {
      const body = await request.json()
      const { endpoint, data, token } = body
  
      // Construir la URL completa
      const baseUrl = process.env.API_URL || "http://localhost:8000"
      const url = `${baseUrl}${endpoint}`
  
      // Configurar los headers
      const headers = {
        "Content-Type": "application/json",
      }
  
      // Añadir token de autorización si existe
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
  
      // Realizar la petición al backend
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      })
  
      // Obtener los datos de respuesta
      const responseData = await response.json()
  
      // Devolver la respuesta con el mismo status
      return Response.json(responseData, { status: response.status })
    } catch (error) {
      console.error("Error en el proxy:", error)
      return Response.json({ error: "Error interno del servidor" }, { status: 500 })
    }
  }
  
  