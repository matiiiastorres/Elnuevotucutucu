// Helper para navegación programática
export function useNavigation() {
  const router = useRouter();

  const navigateTo = {
    manageStore: (id) => router.push(routes.manageStore(id)),
    editProduct: (storeId, productId) =>
      router.push(routes.editProduct(storeId, productId)),
    // ... más funciones
  };

  return navigateTo;
}
