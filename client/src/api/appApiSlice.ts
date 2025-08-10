import { baseApi } from "./baseApi";

export const appApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    healthCheck: builder.query<{ status: string }, void>({
      query: () => ({ url: "/health", method: "GET" }),
    }),
  }),
});

export const { useHealthCheckQuery } = appApiSlice;
