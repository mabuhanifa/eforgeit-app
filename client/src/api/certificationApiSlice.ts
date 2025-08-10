import { baseApi } from "./baseApi";

export const certificationApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCertification: builder.query({
      query: () => ({
        url: "/certifications/me",
        method: "GET",
      }),
      providesTags: ["Assessment"],
    }),
  }),
});

export const { useGetMyCertificationQuery } = certificationApiSlice;
