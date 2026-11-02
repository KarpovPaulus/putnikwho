import type { TourDetails, TourListItem } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// EXPO_PUBLIC_* Expo встраивает в бандл при сборке (как VITE_* в Vite).
// После правки .env нужен перезапуск: npx expo start -c
const API_URL = process.env.EXPO_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error("EXPO_PUBLIC_API_URL не задан в .env приложения");
}

export const api = createApi({
  reducerPath: "api", // ключ в store: state.api
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }), // обёртка над fetch
  endpoints: (build) => ({
    // build.query<ЧтоПриходит, ЧтоПередаём>
    getTours: build.query<TourListItem[], void>({
      query: () => "/tours",
    }),
    getTour: build.query<TourDetails, string>({
      query: (tourId) => `/tours/${tourId}`,
    }),
  }),
});

// Хуки генерируются из имён эндпоинтов: getTours → useGetToursQuery
export const { useGetToursQuery, useGetTourQuery } = api;
