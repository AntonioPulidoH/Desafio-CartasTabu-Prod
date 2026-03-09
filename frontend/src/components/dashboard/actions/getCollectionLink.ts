const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getCollection(id: number) {
  const response = await fetch(`${API_BASE_URL}/themes/${id}/public`);
  
  if (!response.ok) throw new Error("Colección no encontrada");
  
  return response.json();
}

export function getCollectionLink(id: number): string {
  return `${window.location.origin}/collection/${id}`;
}