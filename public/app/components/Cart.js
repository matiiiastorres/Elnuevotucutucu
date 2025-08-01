"use client"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function Cart() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()

  const groupedByStore = cart.reduce((acc, item) => {
    const storeId = item.product.store._id || item.product.store
    if (!acc[storeId]) {
      acc[storeId] = {
        store: item.product.store,
        items: [],
      }
    }
    acc[storeId].items.push(item)
    return acc
  }, {})

  const sendWhatsAppOrder = (storeGroup) => {
    const store = storeGroup.store
    const items = storeGroup.items

    let message = `¡Hola! Quiero hacer un pedido:\n\n`

    // Agregar productos
    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.name} - $${(item.product.price * item.quantity).toFixed(2)}\n`
    })

    // Calcular total de esta tienda
    const storeTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    message += `\n💰 Total: $${storeTotal.toFixed(2)}\n`

    // Agregar datos del cliente si está logueado
    if (user) {
      message += `\n👤 Cliente: ${user.name}\n📞 Teléfono: ${user.phone}\n`
      if (user.address) {
        message += `📍 Dirección: ${user.address.street}, ${user.address.city}\n`
      }
    }

    message += `\n¡Gracias!`

    // Limpiar número de WhatsApp (solo números)
    const whatsappNumber = (store.whatsapp || store.phone).replace(/[^\d]/g, "")

    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank")

    // Limpiar carrito de esta tienda
    items.forEach((item) => {
      removeFromCart(item.product._id)
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🛒</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-600">Agrega algunos productos para empezar</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.values(groupedByStore).map((storeGroup) => (
                  <div key={storeGroup.store._id || storeGroup.store} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">
                        {typeof storeGroup.store === "object" ? storeGroup.store.name : "Tienda"}
                      </h3>
                      <button
                        onClick={() => sendWhatsAppOrder(storeGroup)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1"
                      >
                        <span>📱</span>
                        <span>Pedir por WhatsApp</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {storeGroup.items.map((item) => (
                        <div key={item.product._id} className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.image || "/placeholder-product.jpg"}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                            <p className="text-primary-600 font-semibold">${item.product.price}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product._id)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between font-semibold">
                        <span>Subtotal:</span>
                        <span>
                          $
                          {storeGroup.items
                            .reduce((total, item) => total + item.product.price * item.quantity, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
                <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm">
                  Limpiar carrito
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Haz clic en "Pedir por WhatsApp" en cada tienda para finalizar tu pedido
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
