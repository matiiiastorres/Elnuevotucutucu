"use client"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function ProductCard({ product, store }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart({ ...product, store }, quantity)
    setQuantity(1)
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
          {product.stock > 0 && <span className="text-sm text-gray-500">Stock: {product.stock}</span>}
        </div>

        {product.isAvailable && product.stock > 0 ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-gray-100">
                -
              </button>
              <span className="px-3 py-1 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 btn-primary">
              Agregar
            </button>
          </div>
        ) : (
          <button disabled className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed">
            No disponible
          </button>
        )}
      </div>
    </div>
  )
}
