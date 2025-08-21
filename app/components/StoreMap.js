// 'use client';
// import { useState, useEffect } from 'react';
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
// } from 'react-simple-maps';

// const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'; // mapa mundial simple

// export default function StoresMap() {
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const res = await fetch(
//           `${
//             process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
//           }/api/stores`
//         );
//         const data = await res.json();
//         setStores(data);
//       } catch (err) {
//         console.error('Error fetching stores:', err);
//       }
//     };
//     fetchStores();
//   }, []);

//   return (
//     <ComposableMap
//       projection="geoMercator"
//       projectionConfig={{ scale: 1000, center: [-65.2, -26.8] }} // centra en Tucumán
//       style={{ width: '100%', height: '500px' }}
//     >
//       <Geographies geography={geoUrl}>
//         {({ geographies }) =>
//           geographies.map((geo) => (
//             <Geography
//               key={geo.rsmKey}
//               geography={geo}
//               fill="#EAEAEC"
//               stroke="#D6D6DA"
//             />
//           ))
//         }
//       </Geographies>

//       {stores.map((store) => (
//         <Marker
//           key={store._id}
//           coordinates={[
//             parseFloat(store.longitude),
//             parseFloat(store.latitude),
//           ]}
//         >
//           <circle r={6} fill="#FF5533" stroke="#fff" strokeWidth={2} />
//           <text
//             textAnchor="middle"
//             y={-10}
//             style={{
//               fontFamily: 'system-ui',
//               fill: '#5D5A6D',
//               fontSize: '12px',
//             }}
//           >
//             {store.name}
//           </text>
//         </Marker>
//       ))}
//     </ComposableMap>
//   );
// }

// 'use client';
// import { useEffect, useState } from 'react';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';

// export default function StoreMap() {
//   const [stores, setStores] = useState([]);
//   const [viewport, setViewport] = useState({
//     latitude: -26.8206, // Centro de Tucumán
//     longitude: -65.2176,
//     zoom: 12,
//     width: '100%',
//     height: '600px',
//   });
//   const [selectedStore, setSelectedStore] = useState(null);

//   // Traer tiendas desde backend
//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
//         );
//         const data = await res.json();
//         // Filtrar solo tiendas con lat/lng válidos
//         const validStores = data.filter(
//           (store) => store.address?.lat && store.address?.lng
//         );
//         setStores(validStores);
//       } catch (error) {
//         console.error('Error fetching stores:', error);
//       }
//     };

//     fetchStores();
//   }, []);

//   return (
//     <div className="w-full h-[600px] rounded-lg overflow-hidden">
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
//         onViewportChange={(nextViewport) => setViewport(nextViewport)}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         {stores.map((store) => (
//           <Marker
//             key={store._id}
//             latitude={store.address.lat}
//             longitude={store.address.lng}
//           >
//             <button
//               className="text-2xl"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setSelectedStore(store);
//               }}
//             >
//               📍
//             </button>
//           </Marker>
//         ))}

//         {selectedStore && (
//           <Popup
//             latitude={selectedStore.address.lat}
//             longitude={selectedStore.address.lng}
//             onClose={() => setSelectedStore(null)}
//             closeOnClick={false}
//             anchor="top"
//           >
//             <div>
//               <h3 className="font-bold">{selectedStore.name}</h3>
//               <p>{selectedStore.description}</p>
//             </div>
//           </Popup>
//         )}
//       </ReactMapGL>
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

export default function StoreMap() {
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: -26.8206,
    longitude: -65.2176,
    zoom: 12,
    width: '100%',
    height: '600px',
  });
  const [selectedStore, setSelectedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setViewport((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (err) => console.error('Error al obtener ubicación:', err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Traer tiendas desde backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
        );
        const data = await res.json();
        const validStores = data.filter(
          (store) => store.address?.lat && store.address?.lng
        );
        setStores(validStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '600px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Estilo para el botón de cierre del popup */}
      <style>{`
        .mapboxgl-popup-close-button {
          color: white !important;
          background: black !important;
          border-radius: 50% !important;
          font-size: 16px !important;
          width: 24px;
          height: 24px;
          line-height: 22px;
        }
      `}</style>

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {/* Marcadores de tiendas */}
        {stores.map((store) => (
          <Marker
            key={store._id}
            latitude={store.address.lat}
            longitude={store.address.lng}
          >
            <button
              style={{
                fontSize: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedStore(store);
              }}
            >
              📍
            </button>
          </Marker>
        ))}

        {/* Marcador de ubicación del usuario */}
        {userLocation && (
          <Marker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'red',
                borderRadius: '50%',
                border: '2px solid white',
              }}
            />
          </Marker>
        )}

        {/* Popup de la tienda seleccionada */}
        {selectedStore && (
          <Popup
            latitude={selectedStore.address.lat}
            longitude={selectedStore.address.lng}
            onClose={() => setSelectedStore(null)}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            tipSize={10}
            maxWidth="250px"
            offsetTop={-10}
            className="custom-popup"
          >
            <div
              onClick={() => router.push(`/store/${selectedStore._id}`)}
              style={{
                backgroundColor: '#3B82F6',
                color: 'black',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                minWidth: '200px',
              }}
            >
              <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {selectedStore.name}
              </h3>
              <p style={{ margin: 0 }}>{selectedStore.description}</p>
              <span
                style={{
                  textDecoration: 'underline',
                  color: 'black',
                  display: 'block',
                  marginTop: '6px',
                }}
              >
                Ir a la tienda
              </span>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
