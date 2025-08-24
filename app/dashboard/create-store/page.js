// "use client"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "../../context/AuthContext"
// import Header from "../../components/Header"

// export default function CreateStore() {
//   const { user, getAuthHeaders } = useAuth()
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "restaurant",
//     phone: "",
//     whatsapp: "",
//     address: {
//       street: "",
//       city: "",
//       zipCode: "",
//     },
//     deliveryTime: "30-45 min",
//     deliveryFee: 0,
//   })
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const categories = [
//     { id: "restaurant", name: "Restaurante" },
//     { id: "supermarket", name: "Supermercado" },
//     { id: "pharmacy", name: "Farmacia" },
//     { id: "convenience", name: "Tienda de Conveniencia" },
//     { id: "bakery", name: "Panadería" },
//     { id: "other", name: "Otro" },
//   ]

//   const handleChange = (e) => {
//     const { name, value } = e.target

//     if (name.includes("address.")) {
//       const addressField = name.split(".")[1]
//       setFormData({
//         ...formData,
//         address: {
//           ...formData.address,
//           [addressField]: value,
//         },
//       })
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       })
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/stores`, {
//         method: "POST",
//         headers: getAuthHeaders(),
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         router.push("/dashboard")
//       } else {
//         setError(data.message)
//       }
//     } catch (error) {
//       setError("Error de conexión")
//     }

//     setLoading(false)
//   }

//   if (!user || user.role !== "store_owner") {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Acceso denegado</h1>
//           <p className="text-gray-600">Solo los dueños de tienda pueden acceder a esta página.</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <div className="max-w-2xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Crear Nueva Tienda</h1>

//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
//           {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
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
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
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
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
//               <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
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

//           <div>
//             <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-2">
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
//               <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-2">
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
//               <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700 mb-2">
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
//               <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-2">
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
//               <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700 mb-2">
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
//             <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
//               {loading ? "Creando..." : "Crear Tienda"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

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
//       zipCode: '',
//       lat: null,
//       lng: null,
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

//   // Capturar ubicación
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

//         // Reverse geocoding Nominatim
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//           );
//           const data = await res.json();
//           console.log('Nominatim reverse:', data);

//           let street = data.address.road || '';
//           let streetNumber = data.address.house_number || '';

//           // Heurística si no viene el número
//           if (!streetNumber) {
//             const search = await fetch(
//               `https://nominatim.openstreetmap.org/search?format=json&street=${street}&city=${
//                 data.address.town || data.address.city
//               }`
//             );
//             const results = await search.json();
//             console.log('Nominatim search heurístico:', results);
//             if (results.length > 0) {
//               streetNumber = results[0].house_number || '';
//             }
//           }

//           setFormData({
//             ...formData,
//             address: {
//               street,
//               streetNumber,
//               city: data.address.town || data.address.city || '',
//               zipCode: data.address.postcode || '',
//               lat,
//               lng,
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
//                 Tiempo de entregayyyyuuu
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

// ------este es el componente que anda la puta madre----

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
      state: '', // agregado
      country: '', // agregado
      zipCode: '',
      lat: null,
      lng: null,
    },
    deliveryTime: '30-45 min',
    deliveryFee: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationSet, setLocationSet] = useState(false);

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

  // Capturar ubicación
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta GPS');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log('Lat:', lat, 'Lng:', lng);

        try {
          // Reverse geocoding con Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          );
          const data = await res.json();
          console.log('Nominatim reverse:', data);

          let street = data.address.road || '';
          let streetNumber = data.address.house_number || '';

          // fallback: buscar número si no lo devuelve
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
              city: data.address.town || data.address.city || '',
              state: data.address.state || '', // ahora se guarda provincia
              country: data.address.country || '', // ahora se guarda país
              zipCode: data.address.postcode || '',
              lat,
              lng,
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
      console.log('📤 Datos enviados al backend:', formData);
      console.log('Respuesta backend:', data);

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
                placeholder="5493812508502"
              />
            </div>
          </div>

          {/* Botón ubicación */}
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

          {/* Mapa preview */}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de entrega
              </label>
              <input
                name="deliveryTime"
                type="text"
                className="input-field"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="30-45 min"
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
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
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
