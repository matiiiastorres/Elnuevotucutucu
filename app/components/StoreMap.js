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

'use client';
import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

export default function StoreMap() {
  const [stores, setStores] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: -26.8206, // Centro de Tucumán
    longitude: -65.2176,
    zoom: 12,
    width: '100%',
    height: '600px',
  });
  const [selectedStore, setSelectedStore] = useState(null);

  // Traer tiendas desde backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
        );
        const data = await res.json();
        // Filtrar solo tiendas con lat/lng válidos
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
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {stores.map((store) => (
          <Marker
            key={store._id}
            latitude={store.address.lat}
            longitude={store.address.lng}
          >
            <button
              className="text-2xl"
              onClick={(e) => {
                e.preventDefault();
                setSelectedStore(store);
              }}
            >
              📍
            </button>
          </Marker>
        ))}

        {selectedStore && (
          <Popup
            latitude={selectedStore.address.lat}
            longitude={selectedStore.address.lng}
            onClose={() => setSelectedStore(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div>
              <h3 className="font-bold">{selectedStore.name}</h3>
              <p>{selectedStore.description}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
