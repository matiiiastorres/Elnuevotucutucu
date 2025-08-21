// import Header from "./components/Header"
// import Cart from "./components/Cart"
// import StoreCategories from "./components/StoreCategories"
// import FeaturedStores from "./components/FeaturedStores"

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <Cart />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">Pedidos a domicilio en minutos</h1>
//           <p className="text-xl md:text-2xl mb-8 opacity-90">
//             Descubre los mejores restaurantes y tiendas de tu ciudad
//           </p>
//           <div className="max-w-md mx-auto">
//             <div className="flex">
//               <input
//                 type="text"
//                 placeholder="Ingresa tu dirección..."
//                 className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
//               />
//               <button className="bg-primary-500 hover:bg-primary-400 px-6 py-3 rounded-r-lg font-medium transition-colors">
//                 Buscar
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Store Categories */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">¿Qué estás buscando?</h2>
//           <StoreCategories />
//         </div>
//       </section>

//       {/* Featured Stores */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">Tiendas destacadas</h2>
//           <FeaturedStores />
//         </div>
//       </section>
//     </div>
//   )
// }

// 'use client';
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Header from './components/Header';
// import Cart from './components/Cart';
// import StoreCategories from './components/StoreCategories';
// import FeaturedStores from './components/FeaturedStores';

// // ✅ Componente Bottom Navbar
// function BottomNavbar({ current, setCurrent }) {
//   const items = [
//     { id: 'home', label: 'Inicio' },
//     { id: 'categories', label: 'Categorías' },
//     { id: 'stores', label: 'Tiendas' },
//   ];

//   return (
//     <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-50">
//       <div className="flex justify-around py-3">
//         {items.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setCurrent(item.id)}
//             className={`px-4 py-2 font-medium transition-colors ${
//               current === item.id ? 'text-primary-600' : 'text-gray-500'
//             }`}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }

// export default function Home() {
//   const sectionsOrder = ['home', 'categories', 'stores'];
//   const [section, setSection] = useState('home');
//   const [direction, setDirection] = useState(0);

//   const handleChangeSection = (next) => {
//     const currentIndex = sectionsOrder.indexOf(section);
//     const nextIndex = sectionsOrder.indexOf(next);
//     const dir = nextIndex > currentIndex ? 1 : -1;
//     setDirection(dir);
//     setSection(next);
//   };

//   // Variantes dinámicas
//   const variants = {
//     enter: (dir) => {
//       if (dir === 'initial') return { y: -100, opacity: 0 }; // inicio desde arriba
//       return { x: dir > 0 ? 300 : -300, opacity: 0 };
//     },
//     center: { x: 0, y: 0, opacity: 1 },
//     exit: (dir) => {
//       if (dir === 'initial') return { y: 100, opacity: 0 }; // salir hacia abajo en inicio
//       return { x: dir < 0 ? 300 : -300, opacity: 0 };
//     },
//   };

//   const sections = {
//     home: (
//       <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             Pedidos a domicilio en minutos
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 opacity-90">
//             Descubre los mejores restaurantes y tiendas de tu ciudad
//           </p>
//         </div>
//       </section>
//     ),
//     categories: (
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             ¿Qué estás buscando?
//           </h2>
//           <StoreCategories />
//         </div>
//       </section>
//     ),
//     stores: (
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Tiendas destacadas
//           </h2>
//           <FeaturedStores />
//         </div>
//       </section>
//     ),
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       <Header />
//       <Cart />

//       {/* Animación entre secciones */}
//       <div className="relative">
//         <AnimatePresence mode="wait" custom={direction || 'initial'}>
//           <motion.div
//             key={section}
//             custom={
//               section === 'home' && direction === 0 ? 'initial' : direction
//             }
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 0.4 }}
//             className="w-full"
//           >
//             {sections[section]}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <BottomNavbar current={section} setCurrent={handleChangeSection} />
//     </div>
//   );
// }

// app/page.js

// 'use client';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Header from './components/Header';
// import Cart from './components/Cart';
// import StoreCategories from './components/StoreCategories';
// import FeaturedStores from './components/FeaturedStores';
// import StoreMap from './components/StoreMap'; // Importa el componente del mapa

// // Componente Bottom Navbar
// function BottomNavbar({ current, setCurrent }) {
//   const items = [
//     { id: 'home', label: 'Inicio' },
//     { id: 'categories', label: 'Categorías' },
//     { id: 'stores', label: 'Tiendas' },
//   ];

//   return (
//     <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-50">
//       <div className="flex justify-around py-3">
//         {items.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setCurrent(item.id)}
//             className={`px-4 py-2 font-medium transition-colors ${
//               current === item.id ? 'text-primary-600' : 'text-gray-500'
//             }`}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }

// export default function Home() {
//   const sectionsOrder = ['home', 'categories', 'stores'];
//   const [section, setSection] = useState('home');
//   const [direction, setDirection] = useState(0);

//   const handleChangeSection = (next) => {
//     const currentIndex = sectionsOrder.indexOf(section);
//     const nextIndex = sectionsOrder.indexOf(next);
//     const dir = nextIndex > currentIndex ? 1 : -1;
//     setDirection(dir);
//     setSection(next);
//   };

//   // Variantes dinámicas para framer-motion
//   const variants = {
//     enter: (dir) => {
//       if (dir === 'initial') return { y: -100, opacity: 0 };
//       return { x: dir > 0 ? 300 : -300, opacity: 0 };
//     },
//     center: { x: 0, y: 0, opacity: 1 },
//     exit: (dir) => {
//       if (dir === 'initial') return { y: 100, opacity: 0 };
//       return { x: dir < 0 ? 300 : -300, opacity: 0 };
//     },
//   };

//   const sections = {
//     home: (
//       <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             Pedidos a domicilio en minutos
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 opacity-90">
//             Descubre los mejores restaurantes y tiendas de tu ciudad
//           </p>

//           {/* Aquí va el mapa */}
//           <div className="mt-8 rounded-lg overflow-hidden">
//             <StoreMap />
//           </div>
//         </div>
//       </section>
//     ),
//     categories: (
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             ¿Qué estás buscando?
//           </h2>
//           <StoreCategories />
//         </div>
//       </section>
//     ),
//     stores: (
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Tiendas destacadas
//           </h2>
//           <FeaturedStores />
//         </div>
//       </section>
//     ),
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       <Header />
//       <Cart />

//       {/* Animación entre secciones */}
//       <div className="relative">
//         <AnimatePresence mode="wait" custom={direction || 'initial'}>
//           <motion.div
//             key={section}
//             custom={
//               section === 'home' && direction === 0 ? 'initial' : direction
//             }
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 0.4 }}
//             className="w-full"
//           >
//             {sections[section]}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <BottomNavbar current={section} setCurrent={handleChangeSection} />
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Cart from './components/Cart';
import StoreCategories from './components/StoreCategories';
import FeaturedStores from './components/FeaturedStores';
import StoreMap from './components/StoreMap';

function BottomNavbar({ current, setCurrent }) {
  const items = [
    { id: 'home', label: 'Inicio' },
    { id: 'categories', label: 'Categorías' },
    { id: 'stores', label: 'Tiendas' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-50">
      <div className="flex justify-around py-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              current === item.id ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function Home() {
  const sectionsOrder = ['home', 'categories', 'stores'];
  const [section, setSection] = useState('home');
  const [direction, setDirection] = useState(0);

  const handleChangeSection = (next) => {
    const currentIndex = sectionsOrder.indexOf(section);
    const nextIndex = sectionsOrder.indexOf(next);
    const dir = nextIndex > currentIndex ? 1 : -1;
    setDirection(dir);
    setSection(next);
  };

  const variants = {
    enter: (dir) =>
      dir === 'initial'
        ? { y: -100, opacity: 0 }
        : { x: dir > 0 ? 300 : -300, opacity: 0 },
    center: { x: 0, y: 0, opacity: 1 },
    exit: (dir) =>
      dir === 'initial'
        ? { y: 100, opacity: 0 }
        : { x: dir < 0 ? 300 : -300, opacity: 0 },
  };

  const sections = {
    home: (
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Pedidos a domicilio en minutos
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Descubre los mejores restaurantes y tiendas de tu ciudad
          </p>
          <div className="mt-8 rounded-lg overflow-hidden">
            <StoreMap />
          </div>
        </div>
      </section>
    ),
    categories: (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Qué estás buscando?
          </h2>
          <StoreCategories />
        </div>
      </section>
    ),
    stores: (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tiendas destacadas
          </h2>
          <FeaturedStores />
        </div>
      </section>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <Cart />
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction || 'initial'}>
          <motion.div
            key={section}
            custom={
              section === 'home' && direction === 0 ? 'initial' : direction
            }
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {sections[section]}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNavbar current={section} setCurrent={handleChangeSection} />
    </div>
  );
}
