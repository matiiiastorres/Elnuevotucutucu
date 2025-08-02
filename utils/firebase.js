// utils/firebase.js

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // ✅ UUID correctamente importado

// 📦 Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBFzo6F4575YyWg5Oqqq5ZLwg7WnpP1zYc',
  authDomain: 'matias-mit-wallet.firebaseapp.com',
  projectId: 'matias-mit-wallet',
  storageBucket: 'matias-mit-wallet.appspot.com',
  messagingSenderId: '390985326962',
  locationId: 'us-central',
};

// 🚀 Inicializar Firebase y obtener Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// ⬆️ Función para subir archivo y obtener URL de descarga
export const uploadFile = async (file) => {
  const uniqueFileName = `profile-images/${uuidv4()}-${file.name}`;
  const storageRef = ref(storage, uniqueFileName);

  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

  console.log('✅ URL generada para MongoDB:', downloadURL); // ✅ LOG para ver la URL

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
