import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'El Tucu - Pedidos a domicilio',
  description: 'Aplicacion cripto',
  generator: 'v0.dev',
};

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
  );
}
