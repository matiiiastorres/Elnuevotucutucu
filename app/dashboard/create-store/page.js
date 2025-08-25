// // ------este es el componente que anda la puta madre----

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
//       streetNumber: '',
//       city: '',
//       state: '',
//       country: '',
//       zipCode: '',
//       lat: null,
//       lng: null,
//       fullAddress: '',
//     },
//     deliveryTime: '30-45 min',
//     deliveryFee: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [locationSet, setLocationSet] = useState(false);

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
//       const field = name.split('.')[1];
//       setFormData({
//         ...formData,
//         address: {
//           ...formData.address,
//           [field]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Capturar ubicación con GPS y Nominatim
//   const handleUseMyLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Tu navegador no soporta GPS');
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         console.log('Lat:', lat, 'Lng:', lng);

//         try {
//           // Reverse geocoding con Nominatim
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
//           );
//           const data = await res.json();
//           console.log('Nominatim reverse:', data);

//           let street = data.address.road || '';
//           let streetNumber = data.address.house_number || '';

//           // fallback: buscar número si no lo devuelve
//           if (!streetNumber) {
//             const search = await fetch(
//               `https://nominatim.openstreetmap.org/search?format=json&street=${street}&city=${
//                 data.address.town || data.address.city
//               }`
//             );
//             const results = await search.json();
//             if (results.length > 0) {
//               streetNumber = results[0].house_number || '';
//             }
//           }

//           // Guardamos todos los datos relevantes
//           setFormData({
//             ...formData,
//             address: {
//               street,
//               streetNumber,
//               city: data.address.city || data.address.town || '',
//               state: data.address.state || '',
//               country: data.address.country || '',
//               zipCode: data.address.postcode || '',
//               lat,
//               lng,
//               fullAddress: data.display_name || '',
//             },
//           });
//           setLocationSet(true);
//         } catch (err) {
//           console.error('Error reverse geocoding:', err);
//           alert('No se pudo obtener la dirección automáticamente');
//         }
//       },
//       (error) => {
//         console.error('Error GPS:', error);
//         alert('Debes permitir el acceso a tu ubicación');
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!locationSet) {
//       alert('Debes usar tu ubicación antes de crear la tienda');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
//         }/api/stores`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             ...getAuthHeaders(),
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await response.json();
//       console.log('Respuesta backend:', data);

//       if (response.ok) {
//         router.push('/dashboard');
//       } else {
//         setError(data.message || 'Error creando la tienda');
//       }
//     } catch (err) {
//       console.error(err);
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
//           Crear Nueva Tiendayyyy
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
//                 placeholder="5493812508502"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <button
//               type="button"
//               onClick={handleUseMyLocation}
//               className="btn-primary"
//             >
//               Usar mi ubicación GPS
//             </button>
//             {locationSet && (
//               <span className="text-green-600 self-center">
//                 Ubicación capturada ✅
//               </span>
//             )}
//           </div>

//           {formData.address.lat && formData.address.lng && (
//             <iframe
//               width="100%"
//               height="300"
//               frameBorder="0"
//               scrolling="no"
//               marginHeight="0"
//               marginWidth="0"
//               src={`https://www.openstreetmap.org/export/embed.html?bbox=${
//                 formData.address.lng - 0.001
//               }%2C${formData.address.lat - 0.001}%2C${
//                 formData.address.lng + 0.001
//               }%2C${formData.address.lat + 0.001}&layer=mapnik&marker=${
//                 formData.address.lat
//               }%2C${formData.address.lng}`}
//             ></iframe>
//           )}

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
//               Cancelareee
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
import { uploadFile } from '../../../utils/firebase'; // 👈 importar función para subir imágenes

export default function CreateStore() {
  const { user, getAuthHeaders } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'restaurant',
    phone: '',
    whatsapp: '',
    image: '', // 👈 nueva propiedad
    address: {
      street: '',
      streetNumber: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      lat: null,
      lng: null,
      fullAddress: '',
    },
    deliveryTime: '30-45 min',
    deliveryFee: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationSet, setLocationSet] = useState(false);
  const [uploading, setUploading] = useState(false); // 👈 estado para subir imagen

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
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 📸 Manejar subida de imagen a Firebase
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const downloadURL = await uploadFile(file);
      setFormData({ ...formData, image: downloadURL });
    } catch (err) {
      console.error('Error subiendo imagen:', err);
      alert('No se pudo subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  // Capturar ubicación con GPS y Nominatim
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta GPS');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          );
          const data = await res.json();

          let street = data.address.road || '';
          let streetNumber = data.address.house_number || '';

          if (!streetNumber) {
            const search = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&street=${street}&city=${
                data.address.town || data.address.city
              }`
            );
            const results = await search.json();
            if (results.length > 0) {
              streetNumber = results[0].house_number || '';
            }
          }

          setFormData({
            ...formData,
            address: {
              street,
              streetNumber,
              city: data.address.city || data.address.town || '',
              state: data.address.state || '',
              country: data.address.country || '',
              zipCode: data.address.postcode || '',
              lat,
              lng,
              fullAddress: data.display_name || '',
            },
          });
          setLocationSet(true);
        } catch (err) {
          console.error('Error reverse geocoding:', err);
          alert('No se pudo obtener la dirección automáticamente');
        }
      },
      (error) => {
        console.error('Error GPS:', error);
        alert('Debes permitir el acceso a tu ubicación');
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationSet) {
      alert('Debes usar tu ubicación antes de crear la tienda');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        }/api/stores`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Error creando la tienda');
      }
    } catch (err) {
      console.error(err);
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

          {/* 📸 Subir imagen */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Imagen de la tienda
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-600"
            />
            {uploading && (
              <p className="text-blue-500 text-sm">Subiendo imagen...</p>
            )}
            {formData.image && (
              <img
                src={formData.image}
                alt="Vista previa"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre de la tienda *
            </label>
            <input
              id="name"
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
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descripción *
            </label>
            <textarea
              id="description"
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
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Categoría *
            </label>
            <select
              id="category"
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Teléfono *
              </label>
              <input
                id="phone"
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
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                WhatsApp *
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                className="input-field"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="5493812508502"
              />
            </div>
          </div>

          {/* Ubicación */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="btn-primary"
            >
              Usar mi ubicación GPS
            </button>
            {locationSet && (
              <span className="text-green-600 self-center">
                Ubicación capturada ✅
              </span>
            )}
          </div>

          {formData.address.lat && formData.address.lng && (
            <iframe
              width="100%"
              height="300"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                formData.address.lng - 0.001
              }%2C${formData.address.lat - 0.001}%2C${
                formData.address.lng + 0.001
              }%2C${formData.address.lat + 0.001}&layer=mapnik&marker=${
                formData.address.lat
              }%2C${formData.address.lng}`}
            ></iframe>
          )}

          {/* Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="deliveryTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tiempo de entrega
              </label>
              <input
                id="deliveryTime"
                name="deliveryTime"
                type="text"
                className="input-field"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="30-45 min"
              />
            </div>
            <div>
              <label
                htmlFor="deliveryFee"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Costo de envío ($)
              </label>
              <input
                id="deliveryFee"
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
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Tienda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
