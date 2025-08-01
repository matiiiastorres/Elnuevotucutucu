"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "../../../../../../context/AuthContext"
import Header from "../../../../../../components/Header"
import ImageUpload from "../../../../../../components/ImageUpload"

export default function EditProduct() {
  const params = useParams()
  const router = useRouter()
  const { getAuthHeaders, apiUrl } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    isAvailable: true,
    image: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    if (params.productId) {
      fetchProduct()
    }
  }, [params.productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${params.productId}`)
      if (response.ok) {
        const product = await response.json()
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          stock: product.stock || "",
          isAvailable: product.isAvailable !== false,
          image: product.image || "",
        })
      }
      setFetchLoading(false)
    } catch (error) {
      console.error("Error fetching product:", error)
      setFetchLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
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
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      }

      const response = await fetch(`${apiUrl}/api/products/${params.productId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Producto</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          {/* Imagen del producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del producto</label>
            <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} type="product" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del producto *
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Precio ($) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                className="input-field"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                className="input-field"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              className="input-field"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ej: Comida, Bebidas, Postres, etc."
            />
          </div>

          <div className="flex items-center">
            <input
              id="isAvailable"
              name="isAvailable"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
              Producto disponible
            </label>
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
