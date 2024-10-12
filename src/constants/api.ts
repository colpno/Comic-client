export const SERVER_BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT || '/api/v1';
export const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}${SERVER_BASE_ENDPOINT}` ||
  `http://localhost:3000${SERVER_BASE_ENDPOINT}`;
