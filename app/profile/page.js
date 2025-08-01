'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Cart from '../components/Cart';

export default function Profile() {
  const { user, getAuthHeaders } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
    profileImage: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      bio: user.bio || '',
      address: user.address || { street: '', city: '', zipCode: '' },
      profileImage: user.profileImage || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000mp'
        }/api/upload/profile`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formDataUpload,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormData({
          ...formData,
          profileImage: `${
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000mp'
          }${data.imageUrl}`,
        });
      } else {
        alert('Error subiendo imagen: ' + data.message);
      }
    } catch (error) {
      alert('Error subiendo imagen');
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000mp'
        }/api/auth/profile`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Actualizar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsEditing(false);
        alert('Perfil actualizado exitosamente');
        window.location.reload(); // Recargar para actualizar el contexto
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error de conexión');
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Cargando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Cart />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header del perfil */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full overflow-hidden">
                  <img
                    src={formData.profileImage || '/placeholder-avatar.jpg'}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {uploading ? '⏳' : '📷'}
                  </label>
                )}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-primary-100 capitalize">
                  {user.role === 'store_owner' ? 'Dueño de tienda' : 'Cliente'}
                </p>
                <p className="text-primary-200">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Contenido del perfil */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isEditing
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografía
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="input-field"
                    placeholder="Cuéntanos algo sobre ti..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="input-field mb-3"
                    placeholder="Calle y número"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Ciudad"
                    />
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Código postal"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Nombre
                    </h3>
                    <p className="text-lg text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Teléfono
                    </h3>
                    <p className="text-lg text-gray-900">{user.phone}</p>
                  </div>
                </div>

                {user.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Biografía
                    </h3>
                    <p className="text-gray-900">{user.bio}</p>
                  </div>
                )}

                {user.address && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Dirección
                    </h3>
                    <p className="text-gray-900">
                      {user.address.street}
                      {user.address.city && `, ${user.address.city}`}
                      {user.address.zipCode && ` (${user.address.zipCode})`}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Miembro desde
                  </h3>
                  <p className="text-gray-900">
                    {new Date(
                      user.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección adicional para dueños de tienda */}
        {user.role === 'store_owner' && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Panel de Dueño
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/dashboard"
                className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-lg text-center font-medium transition-colors"
              >
                🏪 Gestionar Tiendas
              </a>
              <a
                href="/dashboard/create-store"
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center font-medium transition-colors"
              >
                ➕ Crear Nueva Tienda
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
