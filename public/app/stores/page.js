"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "../components/Header"
import Link from "next/link"

export default function StoresPage() {
  const searchParams = useSearchParams()
  const [stores, setStores] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchStores()
  }, [selectedCategory])

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/stores`)
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchStores = async () => {
    try {
      const url =
        selectedCategory === "all"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/stores?category=${selectedCategory}`

      const response = await fetch(url)
      const data = await response.json()
      setStores(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching stores:", error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Todas las tiendas</h1>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border"
              }`}
            >
              Todas las categorías
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stores Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🏪</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay tiendas disponibles</h3>
            <p className="text-gray-600">No se encontraron tiendas en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stores.map((store) => (
              <Link
                key={store._id}
                href={`/store/${store._id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={store.image || "/placeholder-store.jpg"}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  {!store.isActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Cerrado</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{store.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      {store.rating.toFixed(1)}
                    </span>
                    <span>{store.deliveryTime}</span>
                    <span>${store.deliveryFee === 0 ? "Gratis" : store.deliveryFee}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
