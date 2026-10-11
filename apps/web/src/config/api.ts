export const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://stackpath-2f9z.onrender.com' : '');

export function apiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
}
