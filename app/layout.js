import "./globals.css"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

export const metadata = {
  title: "DeliveryApp - Pedidos a domicilio",
  description: "La mejor app de delivery de tu ciudad",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
            <div id="root">{children}</div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
