const ragApiUrl = import.meta.env.VITE_RAG_API_BASE_URL;
const restApiUrl = import.meta.env.VITE_REST_API_BASE_URL;
const secretKeyAudash = import.meta.env.VITE_SECRET_KEY_AUDASH;

export const config = {
  api: {
    ragBaseUrl: ragApiUrl,
    restBaseUrl: restApiUrl,
    secretKeyAudash: secretKeyAudash,
  },
};
