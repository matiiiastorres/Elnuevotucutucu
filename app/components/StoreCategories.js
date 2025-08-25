// "use client"
// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useAuth } from "../context/AuthContext"

// export default function StoreCategories() {
//   const { apiUrl } = useAuth()
//   const [categories, setCategories] = useState([])

//   useEffect(() => {
//     fetchCategories()
//   }, [])

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/api/categories/stores`)
//       const data = await response.json()
//       setCategories(data)
//     } catch (error) {
//       console.error("Error fetching categories:", error)
//     }
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//       {categories.map((category) => (
//         <Link
//           key={category.id}
//           href={`/stores?category=${category.id}`}
//           className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
//         >
//           <span className="text-4xl mb-3">{category.icon}</span>
//           <span className="text-sm font-medium text-center">{category.name}</span>
//         </Link>
//       ))}
//     </div>
//   )
// }

// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';

// // Mapeo de países con banderas
// const COUNTRIES = [
//   { code: 'argentina', name: 'Argentina', flag: '🇦🇷' },
//   { code: 'brasil', name: 'Brasil', flag: '🇧🇷' },
//   { code: 'chile', name: 'Chile', flag: '🇨🇱' },
//   { code: 'uruguay', name: 'Uruguay', flag: '🇺🇾' },
//   { code: 'paraguay', name: 'Paraguay', flag: '🇵🇾' },
//   { code: 'peru', name: 'Perú', flag: '🇵🇪' },
// ];

// export default function StoreCategories() {
//   const { apiUrl } = useAuth();
//   const [categories, setCategories] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [provinces, setProvinces] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedProvince, setSelectedProvince] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//     fetchCountries();
//   }, []);

//   // 🔹 Cargar categorías (todas o filtradas por país/provincia)
//   const fetchCategories = async (country = null, province = null) => {
//     try {
//       let url = `${apiUrl}/api/categories/stores`;
//       if (country) url += `?country=${country}`;
//       if (province) url += `&state=${province}`;

//       const response = await fetch(url);
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   // // 🔹 Cargar países con cantidad de tiendas
//   // const fetchCountries = async () => {
//   //   try {
//   //     const response = await fetch(`${apiUrl}/api/stores/countries`);
//   //     const data = await response.json();
//   //     setCountries(data);
//   //   } catch (error) {
//   //     console.error('Error fetching countries:', error);
//   //   }
//   // };

//   // 🔹 Cargar países con cantidad de tiendas
//   const fetchCountries = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/api/stores/filters/countries`);
//       const data = await response.json();

//       // Aseguramos que siempre sea un array
//       setCountries(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//       setCountries([]); // fallback seguro
//     }
//   };

//   // // 🔹 Cargar provincias de un país
//   // const fetchProvinces = async (country) => {
//   //   try {
//   //     const response = await fetch(
//   //       `${apiUrl}/api/stores/provinces?country=${country}`
//   //     );
//   //     const data = await response.json();
//   //     setProvinces(data);
//   //   } catch (error) {
//   //     console.error('Error fetching provinces:', error);
//   //   }
//   // };

//   const fetchProvinces = async (country) => {
//     try {
//       const response = await fetch(
//         `${apiUrl}/api/stores/filters/provinces?country=${country}`
//       );
//       const data = await response.json();

//       // Aseguramos que siempre sea un array
//       const provincesWithCount = Array.isArray(data) ? data : [];

//       setProvinces(provincesWithCount);
//     } catch (error) {
//       console.error('Error fetching provinces:', error);
//       setProvinces([]); // fallback seguro
//     }
//   };

//   // Cuando selecciono país
//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setSelectedProvince(null);
//     fetchCategories(country, null);
//     fetchProvinces(country);
//   };

//   // Cuando selecciono provincia
//   const handleProvinceSelect = (province) => {
//     setSelectedProvince(province);
//     fetchCategories(selectedCountry, province);
//   };

//   return (
//     <div className="space-y-8">
//       {/* 🔹 Filtros de Países */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Filtrar por país</h2>
//         <div className="flex flex-wrap gap-3">
//           {COUNTRIES.map((c) => {
//             const count =
//               countries.find((x) => x.country === c.name)?.count || 0;
//             return (
//               <button
//                 key={c.code}
//                 onClick={() => handleCountrySelect(c.name)}
//                 className={`px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-medium transition
//                   ${
//                     selectedCountry === c.name
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-white hover:bg-gray-100'
//                   }`}
//               >
//                 <span>{c.flag}</span>
//                 <span>{c.name}</span>
//                 <span className="text-xs text-gray-500">({count})</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 🔹 Filtros de Provincias (solo si hay país seleccionado) */}
//       {selectedCountry && provinces.length > 0 && (
//         <div>
//           <h2 className="text-lg font-semibold mb-3">Filtrar por provincia</h2>
//           <div className="flex flex-wrap gap-3">
//             {provinces.map((prov) => (
//               <button
//                 key={prov.state}
//                 onClick={() => handleProvinceSelect(prov.state)}
//                 className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium transition
//                   ${
//                     selectedProvince === prov.state
//                       ? 'bg-green-600 text-white'
//                       : 'bg-white hover:bg-gray-100'
//                   }`}
//               >
//                 {prov.state}{' '}
//                 <span className="text-xs text-gray-500">({prov.count})</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* 🔹 Categorías filtradas */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Categorías</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               href={`/stores?category=${category.id}&country=${
//                 selectedCountry || ''
//               }&state=${selectedProvince || ''}`}
//               className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             >
//               <span className="text-4xl mb-3">{category.icon}</span>
//               <span className="text-sm font-medium text-center">
//                 {category.name}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';

// // Mapeo de países con banderas
// const COUNTRIES = [
//   { code: 'argentina', name: 'Argentina', flag: '🇦🇷' },
//   { code: 'brasil', name: 'Brasil', flag: '🇧🇷' },
//   { code: 'chile', name: 'Chile', flag: '🇨🇱' },
//   { code: 'uruguay', name: 'Uruguay', flag: '🇺🇾' },
//   { code: 'paraguay', name: 'Paraguay', flag: '🇵🇾' },
//   { code: 'peru', name: 'Perú', flag: '🇵🇪' },
// ];

// export default function StoreCategories() {
//   const { apiUrl } = useAuth();
//   const [categories, setCategories] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]); // 🔹 Cambié "provinces" por "states"
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null); // 🔹 Cambié "selectedProvince" por "selectedState"

//   useEffect(() => {
//     fetchCategories();
//     fetchCountries();
//   }, []);

//   // 🔹 Cargar categorías (filtrado por country y state)
//   const fetchCategories = async (country = null, state = null) => {
//     try {
//       let url = `${apiUrl}/api/categories/stores`;
//       if (country) url += `?country=${country}`;
//       if (state) url += `&state=${state}`; // 🔹 Aquí se usa state
//       const response = await fetch(url);
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   // 🔹 Cargar países con cantidad de tiendas
//   const fetchCountries = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/api/stores/filters/countries`);
//       const data = await response.json();
//       setCountries(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//       setCountries([]);
//     }
//   };
//   // 🔹 Cargar estados de un país
//   const fetchStates = async (country) => {
//     try {
//       const response = await fetch(
//         `${apiUrl}/api/stores/filters/states?country=${country}` // 🔹 Ruta actualizada
//       );
//       const data = await response.json();

//       // 🔹 Guardamos en "states" y aseguramos que sea un array
//       setStates(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching states:', error);
//       setStates([]); // fallback seguro
//     }
//   };

//   // 🔹 Selección de país
//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setSelectedState(null); // 🔹 Reiniciamos estado seleccionado
//     fetchCategories(country, null);
//     fetchStates(country); // 🔹 Cambié fetchProvinces por fetchStates
//   };

//   // 🔹 Selección de estado
//   const handleStateSelect = (state) => {
//     setSelectedState(state); // 🔹 Cambié selectedProvince por selectedState
//     fetchCategories(selectedCountry, state);
//   };

//   return (
//     <div className="space-y-8">
//       {/* 🔹 Filtros de Países */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Filtrar por país</h2>
//         <div className="flex flex-wrap gap-3">
//           {COUNTRIES.map((c) => {
//             const count =
//               countries.find((x) => x.country === c.name)?.count || 0;
//             return (
//               <button
//                 key={c.code}
//                 onClick={() => handleCountrySelect(c.name)}
//                 className={`px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-medium transition ${
//                   selectedCountry === c.name
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-white hover:bg-gray-100'
//                 }`}
//               >
//                 <span>{c.flag}</span>
//                 <span>{c.name}</span>
//                 <span className="text-xs text-gray-500">({count})</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 🔹 Filtros de Estados (solo si hay país seleccionado) */}
//       {selectedCountry && states.length > 0 && (
//         <div>
//           <h2 className="text-lg font-semibold mb-3">Filtrar por estado</h2>
//           <div className="flex flex-wrap gap-3">
//             {states.map((st) => (
//               <button
//                 key={st.state}
//                 onClick={() => handleStateSelect(st.state)}
//                 className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium transition ${
//                   selectedState === st.state
//                     ? 'bg-green-600 text-white'
//                     : 'bg-white hover:bg-gray-100'
//                 }`}
//               >
//                 {st.state}{' '}
//                 <span className="text-xs text-gray-500">({st.count})</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* 🔹 Categorías filtradas */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Categorías</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               href={`/stores?category=${category.id}&country=${
//                 selectedCountry || ''
//               }&state=${selectedState || ''}`} // 🔹 Usamos state
//               className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             >
//               <span className="text-4xl mb-3">{category.icon}</span>
//               <span className="text-sm font-medium text-center">
//                 {category.name}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";

// export default function StoreCategories({ apiUrl, country, state }) {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Cargar categorías dinámicas con filtros
//   const fetchCategories = async () => {
//     try {
//       setLoading(true);

//       let url = `${apiUrl}/api/categories/stores`;
//       const params = new URLSearchParams();
//       if (country) params.append("country", country);
//       if (state) params.append("state", state);

//       if (params.toString()) {
//         url += `?${params.toString()}`;
//       }

//       const response = await fetch(url);
//       const data = await response.json();
//       setCategories(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, [country, state]); // 🔹 Se vuelve a cargar cuando cambia país o estado

//   if (loading) return <p>Cargando categorías...</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-3">Categorías</h2>
//       <ul className="grid grid-cols-2 gap-3">
//         {categories.map((cat) => (
//           <li
//             key={cat.id}
//             className="border rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 transition"
//           >
//             <span>
//               {cat.icon} {cat.name}
//             </span>
//             <span className="text-sm text-gray-500">{cat.count}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag'; // ✅ Agregado para mostrar banderas

export default function StoreCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Usamos la variable de entorno

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [stores, setStores] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  /* ------------------------------------------------
     📌 1) Obtener lista de países con tiendas activas
  --------------------------------------------------*/
  const fetchCountries = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/stores/filters/countries`);
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error('❌ Error cargando países:', err);
    }
  };

  /* ------------------------------------------------
     📌 2) Obtener lista de estados de un país
  --------------------------------------------------*/
  const fetchStates = async (country) => {
    try {
      const res = await fetch(
        `${apiUrl}/api/stores/filters/states?country=${country}`
      );
      const data = await res.json();
      setStates(data);
    } catch (err) {
      console.error('❌ Error cargando estados:', err);
      setStates([]);
    }
  };

  /* ------------------------------------------------
     📌 3) Obtener categorías de tiendas filtradas
  --------------------------------------------------*/
  const fetchCategories = async (country = null, state = null) => {
    try {
      let url = `${apiUrl}/api/categories/stores`;
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (state) params.append('state', state);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('❌ Error cargando categorías:', err);
    }
  };

  /* ------------------------------------------------
     📌 4) Obtener tiendas filtradas
  --------------------------------------------------*/
  const fetchStores = async (country = null, state = null) => {
    try {
      let url = `${apiUrl}/api/stores`;
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (state) params.append('state', state);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error('❌ Error cargando tiendas:', err);
    }
  };

  /* ------------------------------------------------
     📌 5) Cargar data inicial
  --------------------------------------------------*/
  useEffect(() => {
    fetchCountries();
    fetchCategories();
    fetchStores();
  }, []);

  /* ------------------------------------------------
     📌 6) Al seleccionar un país
  --------------------------------------------------*/
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);

    fetchStates(country);
    fetchCategories(country, null);
    fetchStores(country, null);
  };

  /* ------------------------------------------------
     📌 7) Al seleccionar un estado
  --------------------------------------------------*/
  const handleStateSelect = (state) => {
    setSelectedState(state);

    fetchCategories(selectedCountry, state);
    fetchStores(selectedCountry, state);
  };

  /* ------------------------------------------------
     📌 8) Renderizado
  --------------------------------------------------*/
  return (
    <div className="space-y-8">
      {/* Países */}
      <div>
        <h2 className="text-lg font-semibold mb-3">🌎 Filtrar por país</h2>
        <div className="flex flex-wrap gap-3">
          {countries.map((c) => (
            <button
              key={c.country}
              onClick={() => handleCountrySelect(c.country)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md text-sm font-medium transition ${
                selectedCountry === c.country
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {/* ✅ Bandera agregada aquí */}
              <ReactCountryFlag
                countryCode={
                  c.code ||
                  c.countryCode ||
                  c.country?.slice(0, 2).toUpperCase()
                }
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  borderRadius: '50%',
                }}
              />
              <span>{c.country}</span>
              <span className="text-xs text-gray-500">({c.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Estados */}
      {selectedCountry && states.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            🏙️ Filtrar por estado/ciudad
          </h2>
          <div className="flex flex-wrap gap-3">
            {states.map((s) => (
              <button
                key={s.state}
                onClick={() => handleStateSelect(s.state)}
                className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium transition ${
                  selectedState === s.state
                    ? 'bg-green-600 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {s.state}{' '}
                <span className="text-xs text-gray-500">({s.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categorías */}
      <div>
        <h2 className="text-lg font-semibold mb-3">📂 Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-3">{cat.icon}</span>
              <span className="text-sm font-medium text-center">
                {cat.name}
              </span>
              <span className="text-xs text-gray-500">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tiendas */}
      <div>
        <h2 className="text-lg font-semibold mb-3">🏪 Tiendas</h2>
        <ul className="space-y-3">
          {stores.map((store) => (
            <li
              key={store._id}
              className="p-4 bg-white rounded-lg shadow flex justify-between"
            >
              <span>
                <strong>{store.name}</strong> – {store.category}
              </span>
              <span className="text-gray-500">
                {store.address?.state}, {store.address?.country}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
