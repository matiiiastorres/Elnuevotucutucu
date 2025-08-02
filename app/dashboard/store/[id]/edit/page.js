"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "../../../../context/AuthContext"
import Header from "../../../../components/Header"
import ImageUpload from "../../../../components/ImageUpload"

export default function EditStore() {
  const params = useParams()
  const router = useRouter()
  const { user, getAuthHeaders, apiUrl } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "restaurant",
    phone: "",
    whatsapp: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
    deliveryTime: "30-45 min",
    deliveryFee: 0,
    image: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fetchLoading, setFetchLoading] = useState(true)

  const categories = [
    { id: "restaurant", name: "Restaurante" },
    { id: "supermarket", name: "Supermercado" },
    { id: "pharmacy", name: "Farmacia" },
    { id: "convenience", name: "Tienda de Conveniencia" },
    { id: "bakery", name: "Panadería" },
    { id: "other", name: "Otro" },
  ]

  useEffect(() => {
    if (!user || user.role !== "store_owner") {
      router.push("/")
      return
    }

    if (params.id) {
      fetchStore()
    }
  }, [params.id, user])

  const fetchStore = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/stores/${params.id}`)
      if (response.ok) {
        const store = await response.json()
        setFormData({
          name: store.name || "",
          description: store.description || "",
          category: store.category || "restaurant",
          phone: store.phone || "",
          whatsapp: store.whatsapp || "",
          address: store.address || { street: "", city: "", zipCode: "" },
          deliveryTime: store.deliveryTime || "30-45 min",
          deliveryFee: store.deliveryFee || 0,
          image: store.image || "",
        })
      }
      setFetchLoading(false)
    } catch (error) {
      console.error("Error fetching store:", error)
      setFetchLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes("address.")) {
      const addressField = name.split(".")[1]
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleImageChange = (imageUrl) => {
    setFormData({
      ...formData,
      image: imageUrl,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${apiUrl}/api/stores/${params.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/dashboard/store/${params.id}`)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError("Error de conexión")
    }

    setLoading(false)
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "store_owner") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Acceso denegado</h1>
          <p className="text-gray-600">Solo los dueños de tienda pueden acceder a esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Tienda</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          {/* Imagen de la tienda */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de la tienda</label>
            <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} type="store" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la tienda *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input-field"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              className="input-field"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              id="category"
              name="category"
              className="input-field"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp *
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                className="input-field"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="5491112345678"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-2">
              Dirección *
            </label>
            <input
              id="address.street"
              name="address.street"
              type="text"
              required
              className="input-field"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Calle y número"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <input
                id="address.city"
                name="address.city"
                type="text"
                required
                className="input-field"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal *
              </label>
              <input
                id="address.zipCode"
                name="address.zipCode"
                type="text"
                required
                className="input-field"
                value={formData.address.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de entrega
              </label>
              <input
                id="deliveryTime"
                name="deliveryTime"
                type="text"
                className="input-field"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="30-45 min"
              />
            </div>

            <div>
              <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700 mb-2">
                Costo de envío ($)
              </label>
              <input
                id="deliveryFee"
                name="deliveryFee"
                type="number"
                min="0"
                step="0.01"
                className="input-field"
                value={formData.deliveryFee}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
