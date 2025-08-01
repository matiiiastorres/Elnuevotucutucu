import Header from "./components/Header"
import Cart from "./components/Cart"
import StoreCategories from "./components/StoreCategories"
import FeaturedStores from "./components/FeaturedStores"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Cart />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Pedidos a domicilio en minutos</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Descubre los mejores restaurantes y tiendas de tu ciudad
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Ingresa tu dirección..."
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-primary-500 hover:bg-primary-400 px-6 py-3 rounded-r-lg font-medium transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">¿Qué estás buscando?</h2>
          <StoreCategories />
        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Tiendas destacadas</h2>
          <FeaturedStores />
        </div>
      </section>
    </div>
  )
}
