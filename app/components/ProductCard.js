"use client"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function ProductCard({ product, store }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Asegurar que el producto tenga la información de la tienda
    const productWithStore = {
      ...product,
      store: store || product.store,
    }

    addToCart(productWithStore, quantity)

    // Feedback visual
    setTimeout(() => {
      setIsAdding(false)
      setQuantity(1)
    }, 500)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <img
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">No disponible</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-600">${product.price}</span>
          {product.stock > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Stock: {product.stock}</span>
          )}
        </div>

        {product.isAvailable && product.stock > 0 ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-3 py-2 border-x min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isAdding ? "bg-green-500 text-white" : "bg-primary-600 hover:bg-primary-700 text-white"
              }`}
            >
              {isAdding ? "✓ Agregado" : "Agregar al carrito"}
            </button>
          </div>
        ) : (
          <button disabled className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed">
            {product.stock === 0 ? "Sin stock" : "No disponible"}
          </button>
        )}
      </div>
    </div>
  )
}
