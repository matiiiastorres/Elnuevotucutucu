"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "../../context/AuthContext"
import Header from "../../components/Header"
import ProductCard from "../../components/ProductCard"
import Cart from "../../components/Cart"

export default function StorePage() {
  const params = useParams()
  const { apiUrl } = useAuth()
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchStore()
      fetchProducts()
      fetchCategories()
    }
  }, [params.id])

  const fetchStore = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/stores/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setStore(data)
      }
    } catch (error) {
      console.error("Error fetching store:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/store/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/store/${params.id}/categories`)
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Tienda no encontrada</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Cart />

      {/* Store Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={store.image || "/placeholder-store.jpg"}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
              <p className="text-gray-600 mb-4">{store.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  {store.rating.toFixed(1)}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">🕒</span>
                  {store.deliveryTime}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">🚚</span>${store.deliveryFee === 0 ? "Envío gratis" : `$${store.deliveryFee}`}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">📞</span>
                  {store.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex space-x-4 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap capitalize ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🍽️</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay productos disponibles</h3>
            <p className="text-gray-600">Esta tienda aún no ha agregado productos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} store={store} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
