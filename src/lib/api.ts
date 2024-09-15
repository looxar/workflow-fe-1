import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    // sending cookie via server component
    const isServer = typeof window === "undefined";
    if (isServer) {
      const { cookies } = await import("next/headers");
      config.headers.Cookie = decodeURIComponent(cookies().toString());
    }
    return config;
  },
  (error) => Promise.reject(error)
);
