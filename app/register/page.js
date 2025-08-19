// "use client"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { useAuth } from "../context/AuthContext"
// import Header from "../components/Header"

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "customer",
//     phone: "",
//     address: {
//       street: "",
//       city: "",
//       zipCode: "",
//     },
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const { register } = useAuth()
//   const router = useRouter()

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

//     if (formData.password !== formData.confirmPassword) {
//       setError("Las contraseñas no coinciden")
//       setLoading(false)
//       return
//     }

//     if (formData.password.length < 6) {
//       setError("La contraseña debe tener al menos 6 caracteres")
//       setLoading(false)
//       return
//     }

//     const { confirmPassword, ...dataToSend } = formData
//     const result = await register(dataToSend)

//     if (result.success) {
//       router.push("/")
//     } else {
//       setError(result.message)
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear Cuenta</h2>
//             <p className="mt-2 text-center text-sm text-gray-600">
//               ¿Ya tienes cuenta?{" "}
//               <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
//                 Inicia sesión aquí
//               </Link>
//             </p>
//           </div>

//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Nombre completo
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   className="input-field"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   className="input-field"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                   Teléfono
//                 </label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   required
//                   className="input-field"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Ej: +54 9 11 1234-5678"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                   Tipo de cuenta
//                 </label>
//                 <select id="role" name="role" className="input-field" value={formData.role} onChange={handleChange}>
//                   <option value="customer">Cliente</option>
//                   <option value="store_owner">Dueño de tienda</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
//                   Dirección
//                 </label>
//                 <input
//                   id="address.street"
//                   name="address.street"
//                   type="text"
//                   required
//                   className="input-field"
//                   value={formData.address.street}
//                   onChange={handleChange}
//                   placeholder="Calle y número"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
//                     Ciudad
//                   </label>
//                   <input
//                     id="address.city"
//                     name="address.city"
//                     type="text"
//                     required
//                     className="input-field"
//                     value={formData.address.city}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">
//                     Código Postal
//                   </label>
//                   <input
//                     id="address.zipCode"
//                     name="address.zipCode"
//                     type="text"
//                     required
//                     className="input-field"
//                     value={formData.address.zipCode}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Contraseña
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="input-field"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirmar contraseña
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   className="input-field"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
//               {loading ? "Creando cuenta..." : "Crear Cuenta"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    phone: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      lat: null,
      lng: null,
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    const result = await register(dataToSend);

    if (result.success) router.push('/');
    else setError(result.message);

    setLoading(false);
  };

  // Función para pedir GPS y rellenar dirección
  const requestLocation = async () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Guardamos lat/lng
        const updatedAddress = { ...formData.address, lat, lng };

        // Hacer reverse geocoding con Nominatim
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();
          if (data.address) {
            updatedAddress.street = data.address.road || '';
            updatedAddress.city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              '';
            updatedAddress.zipCode = data.address.postcode || '';
          }
        } catch (err) {
          console.error('Error al obtener dirección:', err);
        }

        setFormData({ ...formData, address: updatedAddress });
      },
      (err) => {
        console.error(err);
        alert('No se pudo obtener la ubicación. Permite el acceso a GPS.');
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Crear Cuenta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Nombre completo"
                className="input-field w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input-field w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Teléfono"
                className="input-field w-full"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="customer">Cliente</option>
                <option value="store_owner">Dueño de tienda</option>
              </select>

              <input
                name="address.street"
                placeholder="Calle y número"
                className="input-field w-full"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="address.city"
                  placeholder="Ciudad"
                  className="input-field"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
                />
                <input
                  name="address.zipCode"
                  placeholder="Código Postal"
                  className="input-field"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                className="input-field w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                className="input-field w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              {formData.role === 'store_owner' && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Activar GPS para obtener ubicación y dirección
                  </p>
                  <button
                    type="button"
                    onClick={requestLocation}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                  >
                    📍 Obtener ubicación automática
                  </button>
                  {formData.address.lat && formData.address.lng && (
                    <p className="text-sm mt-2">
                      Lat: {formData.address.lat.toFixed(5)}, Lng:{' '}
                      {formData.address.lng.toFixed(5)}
                      <br />
                      Dirección: {formData.address.street},{' '}
                      {formData.address.city}, {formData.address.zipCode}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
