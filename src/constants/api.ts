export const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT || '/api/v1';
export const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}${BASE_ENDPOINT}` || `http://localhost:3000${BASE_ENDPOINT}`;
