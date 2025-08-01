"use client"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function Cart() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, getTotalPrice, clearCart, getTotalItems } = useCart()
  const { user } = useAuth()

  const groupedByStore = cart.reduce((acc, item) => {
    const storeId = item.product.store?._id || item.product.store
    const storeName = item.product.store?.name || "Tienda"
    const storeData = item.product.store || { name: "Tienda", whatsapp: "", phone: "" }

    if (!acc[storeId]) {
      acc[storeId] = {
        store: storeData,
        items: [],
      }
    }
    acc[storeId].items.push(item)
    return acc
  }, {})

  const sendWhatsAppOrder = (storeGroup) => {
    const store = storeGroup.store
    const items = storeGroup.items

    let message = `¡Hola! Quiero hacer un pedido desde DeliveryApp:\n\n`

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
      if (user.address && user.address.street) {
        message += `📍 Dirección: ${user.address.street}, ${user.address.city}\n`
      }
    }

    message += `\n¡Gracias! 🙏`

    // Limpiar número de WhatsApp (solo números)
    const whatsappNumber = (store.whatsapp || store.phone || "").replace(/[^\d]/g, "")

    if (!whatsappNumber) {
      alert("Esta tienda no tiene WhatsApp configurado")
      return
    }

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
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>

        {/* Cart Panel */}
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary-600 text-white">
              <h2 className="text-lg font-semibold">🛒 Mi Carrito ({getTotalItems()})</h2>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-2xl">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <span className="text-6xl mb-4 block">🛒</span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-600">Agrega algunos productos para empezar</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Explorar Tiendas
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-6">
                  {Object.values(groupedByStore).map((storeGroup, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg text-gray-900">🏪 {storeGroup.store.name || "Tienda"}</h3>
                        <button
                          onClick={() => sendWhatsAppOrder(storeGroup)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors"
                        >
                          <span>📱</span>
                          <span>WhatsApp</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {storeGroup.items.map((item) => (
                          <div key={item.product._id} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
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
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold transition-colors"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product._id)}
                                className="text-red-500 hover:text-red-700 ml-2 p-1"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Subtotal:</span>
                          <span className="text-primary-600">
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
              <div className="border-t p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</span>
                  <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Limpiar todo
                  </button>
                </div>
                <p className="text-xs text-gray-600 text-center">
                  💡 Haz clic en "WhatsApp" en cada tienda para finalizar tu pedido
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
