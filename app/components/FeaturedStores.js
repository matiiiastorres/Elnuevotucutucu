'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function FeaturedStores() {
  const { apiUrl } = useAuth();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/stores`);
      const data = await response.json();
      setStores(data.slice(0, 8)); // Mostrar solo las primeras 8
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-lg h-64 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stores.map((store) => (
        <Link
          key={store._id}
          href={`/store/${store._id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-48 bg-gray-200 relative">
            <img
              src={store.image || '/placeholder-store.jpg'}
              alt={store.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {store.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>⭐⭐⭐⭐⭐ {store.rating.toFixed(1)}</span>
              <span>{store.deliveryTime}</span>
              <span>
                ${store.deliveryFee === 0 ? 'Gratis' : store.deliveryFee}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
