// Configuración de API
const getApiUrl = () => {
  // En desarrollo
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
  }

  // En producción, usar la variable de entorno de Netlify
  return process.env.NEXT_PUBLIC_API_URL || "https://tu-backend-url.herokuapp.com"
}

export const API_URL = getApiUrl()

// Headers por defecto
export const getHeaders = (includeAuth = false) => {
  const headers = {
    "Content-Type": "application/json",
  }

  if (includeAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}
