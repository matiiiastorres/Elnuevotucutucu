// Configuración centralizada de rutas
export const routes = {
  // Rutas públicas
  home: '/',
  login: '/login',
  register: '/register',
  stores: '/stores',
  store: (id) => `/store/${id}`,

  // Rutas de dashboard
  dashboard: '/dashboard',
  createStore: '/dashboard/create-store',
  manageStore: (id) => `/dashboard/store/${id}`,
  editStore: (id) => `/dashboard/store/${id}/edit`,
  addProduct: (storeId) => `/dashboard/store/${storeId}/add-product`,
  editProduct: (storeId, productId) =>
    `/dashboard/store/${storeId}/product/${productId}/edit`,
};
