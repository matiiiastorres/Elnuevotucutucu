// // "use client"
// // import { useState, useEffect } from "react"
// // import { useParams, useRouter } from "next/navigation"
// // import { useAuth } from "../../../../../../context/AuthContext"
// // import Header from "../../../../../../components/Header"
// // import ImageUpload from "../../../../../../components/ImageUpload"

// // export default function EditProduct() {
// //   const params = useParams()
// //   const router = useRouter()
// //   const { getAuthHeaders, apiUrl } = useAuth()
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     description: "",
// //     price: "",
// //     category: "",
// //     stock: "",
// //     isAvailable: true,
// //     image: "",
// //   })
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState("")
// //   const [fetchLoading, setFetchLoading] = useState(true)

// //   useEffect(() => {
// //     if (params.productId) {
// //       fetchProduct()
// //     }
// //   }, [params.productId])

// //   const fetchProduct = async () => {
// //     try {
// //       const response = await fetch(`${apiUrl}/api/products/${params.productId}`)
// //       if (response.ok) {
// //         const product = await response.json()
// //         setFormData({
// //           name: product.name || "",
// //           description: product.description || "",
// //           price: product.price || "",
// //           category: product.category || "",
// //           stock: product.stock || "",
// //           isAvailable: product.isAvailable !== false,
// //           image: product.image || "",
// //         })
// //       }
// //       setFetchLoading(false)
// //     } catch (error) {
// //       console.error("Error fetching product:", error)
// //       setFetchLoading(false)
// //     }
// //   }

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target
// //     setFormData({
// //       ...formData,
// //       [name]: type === "checkbox" ? checked : value,
// //     })
// //   }

// //   const handleImageChange = (imageUrl) => {
// //     setFormData({
// //       ...formData,
// //       image: imageUrl,
// //     })
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setError("")

// //     try {
// //       const productData = {
// //         ...formData,
// //         price: Number.parseFloat(formData.price),
// //         stock: Number.parseInt(formData.stock),
// //       }

// //       const response = await fetch(`${apiUrl}/api/products/${params.productId}`, {
// //         method: "PUT",
// //         headers: getAuthHeaders(),
// //         body: JSON.stringify(productData),
// //       })

// //       const data = await response.json()

// //       if (response.ok) {
// //         router.push(`/dashboard/store/${params.id}`)
// //       } else {
// //         setError(data.message)
// //       }
// //     } catch (error) {
// //       setError("Error de conexión")
// //     }

// //     setLoading(false)
// //   }

// //   if (fetchLoading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Header />
// //         <div className="max-w-2xl mx-auto px-4 py-8">
// //           <div className="animate-pulse">
// //             <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
// //             <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
// //               <div className="h-48 bg-gray-200 rounded"></div>
// //               <div className="h-4 bg-gray-200 rounded w-3/4"></div>
// //               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />

// //       <div className="max-w-2xl mx-auto px-4 py-8">
// //         <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Producto</h1>

// //         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
// //           {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

// //           {/* Imagen del producto */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del producto</label>
// //             <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} type="product" />
// //           </div>

// //           <div>
// //             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
// //               Nombre del producto *
// //             </label>
// //             <input
// //               id="name"
// //               name="name"
// //               type="text"
// //               required
// //               className="input-field"
// //               value={formData.name}
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
// //               Descripción *
// //             </label>
// //             <textarea
// //               id="description"
// //               name="description"
// //               required
// //               rows={3}
// //               className="input-field"
// //               value={formData.description}
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Precio ($) *
// //               </label>
// //               <input
// //                 id="price"
// //                 name="price"
// //                 type="number"
// //                 min="0"
// //                 step="0.01"
// //                 required
// //                 className="input-field"
// //                 value={formData.price}
// //                 onChange={handleChange}
// //               />
// //             </div>

// //             <div>
// //               <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Stock *
// //               </label>
// //               <input
// //                 id="stock"
// //                 name="stock"
// //                 type="number"
// //                 min="0"
// //                 required
// //                 className="input-field"
// //                 value={formData.stock}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
// //               Categoría *
// //             </label>
// //             <input
// //               id="category"
// //               name="category"
// //               type="text"
// //               required
// //               className="input-field"
// //               value={formData.category}
// //               onChange={handleChange}
// //               placeholder="Ej: Comida, Bebidas, Postres, etc."
// //             />
// //           </div>

// //           <div className="flex items-center">
// //             <input
// //               id="isAvailable"
// //               name="isAvailable"
// //               type="checkbox"
// //               className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
// //               checked={formData.isAvailable}
// //               onChange={handleChange}
// //             />
// //             <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
// //               Producto disponible
// //             </label>
// //           </div>

// //           <div className="flex space-x-4">
// //             <button
// //               type="button"
// //               onClick={() => router.back()}
// //               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
// //             >
// //               Cancelar
// //             </button>
// //             <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
// //               {loading ? "Guardando..." : "Guardar Cambios"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }
// 'use client';
// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useAuth } from '../../../../../../context/AuthContext';
// import Header from '../../../../../../components/Header';
// import { uploadFile } from '../../../../../../utils/firebase';

// export default function EditProduct() {
//   const params = useParams();
//   const router = useRouter();
//   const { user, getAuthHeaders, apiUrl } = useAuth();

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     isAvailable: true,
//     image: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     if (!user || user.role !== 'store_owner') {
//       router.push('/');
//       return;
//     }
//     if (params.productId) {
//       fetchProduct();
//     }
//   }, [params.productId, user]);

//   const fetchProduct = async () => {
//     try {
//       const response = await fetch(
//         `${apiUrl}/api/products/${params.productId}`
//       );
//       if (response.ok) {
//         const product = await response.json();
//         setFormData({
//           name: product.name || '',
//           description: product.description || '',
//           price: product.price?.toString() || '',
//           category: product.category || '',
//           stock: product.stock?.toString() || '',
//           isAvailable: product.isAvailable !== false,
//           image: product.image || '',
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching product:', err);
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     setError('');

//     try {
//       const url = await uploadFile(file);
//       setFormData((prev) => ({
//         ...prev,
//         image: url,
//       }));
//     } catch (uploadError) {
//       console.error('Error uploading image:', uploadError);
//       setError('Error al subir la imagen');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const productData = {
//         ...formData,
//         price: Number.parseFloat(formData.price),
//         stock: Number.parseInt(formData.stock, 10),
//       };

//       const response = await fetch(
//         `${apiUrl}/api/products/${params.productId}`,
//         {
//           method: 'PUT',
//           headers: {
//             ...getAuthHeaders(),
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(productData),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         router.push(`/dashboard/store/${params.id}`);
//       } else {
//         setError(data.message || 'Error al guardar el producto');
//       }
//     } catch (err) {
//       setError('Error de conexión');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-2xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
//             <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
//               <div className="h-48 bg-gray-200 rounded"></div>
//               <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

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
//           Editar Producto
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

//           {/* Imagen del producto */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Imagen del producto
//             </label>
//             {formData.image && (
//               <img
//                 src={formData.image}
//                 alt="Imagen del producto"
//                 className="mb-2 w-48 h-48 object-cover rounded"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               disabled={uploading}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                 file:rounded file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-primary-50 file:text-primary-700
//                 hover:file:bg-primary-100
//                 cursor-pointer"
//             />
//             {uploading && (
//               <p className="text-sm text-gray-600 mt-1">Subiendo imagen...</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Nombre del producto *
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

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label
//                 htmlFor="price"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Precio ($) *
//               </label>
//               <input
//                 id="price"
//                 name="price"
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 required
//                 className="input-field"
//                 value={formData.price}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="stock"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Stock *
//               </label>
//               <input
//                 id="stock"
//                 name="stock"
//                 type="number"
//                 min="0"
//                 required
//                 className="input-field"
//                 value={formData.stock}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Categoría *
//             </label>
//             <input
//               id="category"
//               name="category"
//               type="text"
//               required
//               className="input-field"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Ej: Comida, Bebidas, Postres, etc."
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               id="isAvailable"
//               name="isAvailable"
//               type="checkbox"
//               className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//               checked={formData.isAvailable}
//               onChange={handleChange}
//             />
//             <label
//               htmlFor="isAvailable"
//               className="ml-2 block text-sm text-gray-900"
//             >
//               Producto disponible
//             </label>
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
//               disabled={loading || uploading}
//               className="flex-1 btn-primary disabled:opacity-50"
//             >
//               {loading ? 'Guardando...' : 'Guardar Cambios'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
//
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../../../context/AuthContext';
import Header from '../../../../../../components/Header';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBFzo6F4575YyWg5Oqqq5ZLwg7WnpP1zYc',
  authDomain: 'matias-mit-wallet.firebaseapp.com',
  projectId: 'matias-mit-wallet',
  storageBucket: 'matias-mit-wallet.appspot.com',
  messagingSenderId: '390985326962',
  locationId: 'us-central',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFile = async (file) => {
  const uniqueFileName = `product-images/${uuidv4()}-${file.name}`;
  const storageRef = ref(storage, uniqueFileName);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  console.log('✅ URL generada para MongoDB:', downloadURL);
  return downloadURL;
};

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const { getAuthHeaders, apiUrl } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    isAvailable: true,
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (params.productId) {
      fetchProduct();
    }
  }, [params.productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/products/${params.productId}`
      );
      if (response.ok) {
        const product = await response.json();
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          category: product.category || '',
          stock: product.stock || '',
          isAvailable: product.isAvailable !== false,
          image: product.image || '',
        });
      }
      setFetchLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({
        ...prev,
        image: url,
      }));
    } catch (err) {
      console.error('Error subiendo imagen', err);
      alert('Error subiendo imagen');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      };

      const response = await fetch(
        `${apiUrl}/api/products/${params.productId}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push(`/dashboard/store/${params.id}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error de conexión');
    }

    setLoading(false);
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Editar Producto
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

          {/* Imagen del producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del producto
            </label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Producto"
                className="mb-4 w-full h-48 object-cover rounded"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre del producto *
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio ($) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                className="input-field"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                className="input-field"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Categoría *
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              className="input-field"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ej: Comida, Bebidas, Postres, etc."
            />
          </div>

          <div className="flex items-center">
            <input
              id="isAvailable"
              name="isAvailable"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            <label
              htmlFor="isAvailable"
              className="ml-2 block text-sm text-gray-900"
            >
              Producto disponible
            </label>
          </div>

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
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
