export const serverBaseEndpoint: string = import.meta.env.VITE_BASE_ENDPOINT || '/api/v1';
export const serverUrl: string =
  `${import.meta.env.VITE_SERVER_URL}${serverBaseEndpoint}` ||
  `http://localhost:3000${serverBaseEndpoint}`;
