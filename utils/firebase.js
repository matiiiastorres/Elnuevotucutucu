// 🔧 Configuración básica de Firebase Storage para subir imágenes

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'; // para generar IDs únicos de imágenes

// 📦 Datos de tu proyecto Firebase
const firebaseConfig = {
  projectId: 'matias-mit-wallet',
  storageBucket: 'matias-mit-wallet.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyBFzo6F4575YyWg5Oqqq5ZLwg7WnpP1zYc',
  authDomain: 'matias-mit-wallet.firebaseapp.com',
  messagingSenderId: '390985326962',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadFile = async (file) => {
  const storageRef = ref(storage, `profile-images/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

// // 🔌 Inicializa Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// // 🚀 Función para subir un archivo y devolver la URL pública
// export async function uploadFile(file) {
//   const storageRef = ref(storage, v4()); // crea una referencia con un ID único
//   await uploadBytes(storageRef, file); // sube el archivo a Firebase
//   const urlFoto = await getDownloadURL(storageRef); // obtiene la URL pública
//   return urlFoto;
// }
