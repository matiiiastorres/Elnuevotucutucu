// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/Header';

// export default function CreateStore() {
//   const { user, getAuthHeaders } = useAuth();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     category: 'restaurant',
//     phone: '',
//     whatsapp: '',
//     address: {
//       street: '',
//       city: '',
//       zipCode: '',
//     },
//     deliveryTime: '30-45 min',
//     deliveryFee: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const categories = [
//     { id: 'restaurant', name: 'Restaurante' },
//     { id: 'supermarket', name: 'Supermercado' },
//     { id: 'pharmacy', name: 'Farmacia' },
//     { id: 'convenience', name: 'Tienda de Conveniencia' },
//     { id: 'bakery', name: 'Panadería' },
//     { id: 'other', name: 'Otro' },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.includes('address.')) {
//       const addressField = name.split('.')[1];
//       setFormData({
//         ...formData,
//         address: {
//           ...formData.address,
//           [addressField]: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000mp'
//         }/api/stores`,
//         {
//           method: 'POST',
//           headers: getAuthHeaders(),
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         router.push('/dashboard');
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError('Error de conexión');
//     }

//     setLoading(false);
//   };

//   if (!user || user.role !== 'store_owner') {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Acceso denegado</h1>
//           <p className="text-gray-600">
//             Solo los dueños de tienda pueden acceder a esta página.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <div className="max-w-2xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">
//           Crear Nueva Tienda
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-lg shadow-md p-6 space-y-6"
//         >
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}

//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Nombre de la tienda *
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               required
//               className="input-field"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Descripción *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               required
//               rows={3}
//               className="input-field"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Categoría *
//             </label>
//             <select
//               id="category"
//               name="category"
//               className="input-field"
//               value={formData.category}
//               onChange={handleChange}
//             >
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Teléfono *
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 className="input-field"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+54 9 11 1234-5678"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="whatsapp"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 WhatsApp *
//               </label>
//               <input
//                 id="whatsapp"
//                 name="whatsapp"
//                 type="tel"
//                 required
//                 className="input-field"
//                 value={formData.whatsapp}
//                 onChange={handleChange}
//                 placeholder="5491112345678"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="address.street"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Dirección *
//             </label>
//             <input
//               id="address.street"
//               name="address.street"
//               type="text"
//               required
//               className="input-field"
//               value={formData.address.street}
//               onChange={handleChange}
//               placeholder="Calle y número"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label
//                 htmlFor="address.city"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Ciudad *
//               </label>
//               <input
//                 id="address.city"
//                 name="address.city"
//                 type="text"
//                 required
//                 className="input-field"
//                 value={formData.address.city}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="address.zipCode"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Código Postal *
//               </label>
//               <input
//                 id="address.zipCode"
//                 name="address.zipCode"
//                 type="text"
//                 required
//                 className="input-field"
//                 value={formData.address.zipCode}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label
//                 htmlFor="deliveryTime"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Tiempo de entrega
//               </label>
//               <input
//                 id="deliveryTime"
//                 name="deliveryTime"
//                 type="text"
//                 className="input-field"
//                 value={formData.deliveryTime}
//                 onChange={handleChange}
//                 placeholder="30-45 min"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="deliveryFee"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Costo de envío ($)
//               </label>
//               <input
//                 id="deliveryFee"
//                 name="deliveryFee"
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 className="input-field"
//                 value={formData.deliveryFee}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
//             >
//               Cancelar
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 btn-primary disabled:opacity-50"
//             >
//               {loading ? 'Creando...' : 'Crear Tienda'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';

export default function CreateStore() {
  const { user, getAuthHeaders } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'restaurant',
    phone: '',
    whatsapp: '',
    address: {
      street: '',
      streetNumber: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      lat: '',
      lng: '',
      fullAddress: '',
    },
    deliveryTime: '30-45 min',
    deliveryFee: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { id: 'restaurant', name: 'Restaurante' },
    { id: 'supermarket', name: 'Supermercado' },
    { id: 'pharmacy', name: 'Farmacia' },
    { id: 'convenience', name: 'Tienda de Conveniencia' },
    { id: 'bakery', name: 'Panadería' },
    { id: 'other', name: 'Otro' },
  ];

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

  // 📍 Nominatim: Autocompletar dirección con lat/lng + país, provincia, ciudad
  const handleGeocode = async () => {
    // 🔥 Ahora agregamos state y country al query
    const query = `${formData.address.street} ${formData.address.city} ${formData.address.state} ${formData.address.country} ${formData.address.zipCode}`;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const place = data[0];
        console.log('📍 Resultado Nominatim:', place);

        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            street: prev.address.street || place.address?.road || '',
            streetNumber: place.address?.house_number || '',
            city:
              prev.address.city ||
              place.address?.town ||
              place.address?.city ||
              '',
            state: place.address?.state || prev.address.state || '',
            country: place.address?.country || prev.address.country || '',
            zipCode: prev.address.zipCode || place.address?.postcode || '',
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
            fullAddress: place.display_name || '',
          },
        }));
      } else {
        console.warn('❌ Nominatim no devolvió resultados');
      }
    } catch (err) {
      console.error('⚠️ Error con Nominatim', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 🔎 DEBUG: ver qué datos se mandan al backend
    console.log('📤 Datos enviados al backend:', formData);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        }/api/stores`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error de conexión');
    }

    setLoading(false);
  };

  if (!user || user.role !== 'store_owner') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Acceso denegado</h1>
          <p className="text-gray-600">
            Solo los dueños de tienda pueden acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Crear Nueva Tienda
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la tienda *
            </label>
            <input
              name="name"
              type="text"
              required
              className="input-field"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              className="input-field"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              name="category"
              className="input-field"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Teléfonos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+54 9 11 1234-5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp *
              </label>
              <input
                name="whatsapp"
                type="tel"
                required
                className="input-field"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="5491112345678"
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calle *
            </label>
            <input
              name="address.street"
              type="text"
              required
              className="input-field"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Calle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <input
                name="address.city"
                type="text"
                required
                className="input-field"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provincia / Estado *
              </label>
              <input
                name="address.state"
                type="text"
                required
                className="input-field"
                value={formData.address.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País *
              </label>
              <input
                name="address.country"
                type="text"
                required
                className="input-field"
                value={formData.address.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal *
              </label>
              <input
                name="address.zipCode"
                type="text"
                required
                className="input-field"
                value={formData.address.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 📍 Botón para autocompletar usando Nominatim */}
          <button
            type="button"
            onClick={handleGeocode}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Completar dirección con mapa
          </button>

          {/* Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de entregayyyy
              </label>
              <input
                name="deliveryTime"
                type="text"
                className="input-field"
                value={formData.deliveryTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Costo de envío ($)
              </label>
              <input
                name="deliveryFee"
                type="number"
                min="0"
                step="0.01"
                className="input-field"
                value={formData.deliveryFee}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Tienda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
