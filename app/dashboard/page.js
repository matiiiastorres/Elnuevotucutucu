'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Link from 'next/link';

export default function Dashboard() {
  const { user, getAuthHeaders } = useAuth();
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'store_owner') {
      router.push('/');
      return;
    }

    fetchMyStores();
  }, [user]);

  // const fetchMyStores = async () => {
  //   try {
  //     const response = await fetch(
  //       `${
  //         process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  //       }/api/stores/my/stores`,
  //       {
  //         headers: getAuthHeaders(),
  //       }
  //     );

  const fetchMyStores = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        }/api/stores/my/stores`
      );

      if (response.ok) {
        const data = await response.json();
        setStores(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setLoading(false);
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
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
          <Link href="/dashboard/create-store" className="btn-primary">
            + Crear Nueva Tienda
          </Link>
        </div>

        {stores.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🏪</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes tiendas aún
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primera tienda para empezar a vender
            </p>
            <Link href="/dashboard/create-store" className="btn-primary">
              Crear Mi Primera Tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={store.image || '/placeholder-store.jpg'}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  {!store.isActive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Inactiva
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{store.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {store.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      {store.rating.toFixed(1)}
                    </span>
                    <span className="capitalize">{store.category}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/store/${store._id}`}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      Gestionar
                    </Link>
                    <Link
                      href={`/store/${store._id}`}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      Ver Tienda
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
