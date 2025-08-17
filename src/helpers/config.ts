import axios from "axios";

const API_KEY = process.env.VITE_TMDB_API_KEY as string | undefined;
const BEARER = process.env.VITE_TMDB_BEARER as string | undefined;

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: BEARER ? { Authorization: `Bearer ${BEARER}` } : undefined,
  params: BEARER ? {} : { api_key: API_KEY },
});

client.interceptors.request.use((config) => {
  config.params = {
    language: "en-US",
    ...(config.params || {}),
  };
  return config;
});
