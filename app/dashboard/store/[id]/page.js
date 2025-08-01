'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Header from '../../../components/Header';
import Link from 'next/link';

export default function ManageStore() {
  const params = useParams();
  const router = useRouter();
  const { user, getAuthHeaders } = useAuth();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'store_owner') {
      router.push('/');
      return;
    }

    if (params.id) {
      fetchStore();
      fetchProducts();
    }
  }, [params.id, user]);

  const fetchStore = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          'https://backdelnuevo-ucutucu.onrender.com'
        }/api/stores/${params.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setStore(data);
      }
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          'https://backdelnuevo-ucutucu.onrender.com'
        }/api/products/store/${params.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const toggleStoreStatus = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          'https://backdelnuevo-ucutucu.onrender.com'
        }/api/stores/${params.id}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ isActive: !store.isActive }),
        }
      );

      if (response.ok) {
        const updatedStore = await response.json();
        setStore(updatedStore);
      }
    } catch (error) {
      console.error('Error updating store:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL ||
            'https://backdelnuevo-ucutucu.onrender.com'
          }/api/products/${productId}`,
          {
            method: 'DELETE',
            headers: getAuthHeaders(),
          }
        );

        if (response.ok) {
          setProducts(products.filter((p) => p._id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Tienda no encontrada
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Store Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={store.image || '/placeholder-store.jpg'}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {store.name}
                </h1>
                <p className="text-gray-600 mb-4">{store.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      store.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {store.isActive ? 'Activa' : 'Inactiva'}
                  </span>
                  <span>⭐ {store.rating.toFixed(1)}</span>
                  <span>📞 {store.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={toggleStoreStatus}
                className={`px-4 py-2 rounded-lg font-medium ${
                  store.isActive
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {store.isActive ? 'Desactivar' : 'Activar'}
              </button>
              <Link
                href={`/dashboard/store/${store._id}/edit`}
                className="btn-secondary"
              >
                Editar
              </Link>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Productos ({products.length})
            </h2>
            <Link
              href={`/dashboard/store/${store._id}/add-product`}
              className="btn-primary"
            >
              + Agregar Producto
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📦</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tienes productos aún
              </h3>
              <p className="text-gray-600 mb-6">
                Agrega tu primer producto para empezar a vender
              </p>
              <Link
                href={`/dashboard/store/${store._id}/add-product`}
                className="btn-primary"
              >
                Agregar Primer Producto
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.isAvailable && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        No disponible
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/store/${store._id}/product/${product._id}/edit`}
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
