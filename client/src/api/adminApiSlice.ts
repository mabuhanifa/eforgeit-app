import { baseApi } from "./baseApi";

export const adminApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => ({
        url: `/admin/users?page=${page}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }: { id: string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getQuestions: builder.query({
      query: ({ page = 1, level = "", competency = "" }) => ({
        url: `/admin/questions?page=${page}&level=${level}&competency=${competency}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.questions.map(({ id }: { id: string }) => ({
                type: "Question" as const,
                id,
              })),
              { type: "Question", id: "LIST" },
            ]
          : [{ type: "Question", id: "LIST" }],
    }),
    getAnalytics: builder.query({
      query: () => ({ url: "/admin/reports/analytics", method: "GET" }),
    }),
  }),
});

export const { useGetUsersQuery, useGetQuestionsQuery, useGetAnalyticsQuery } =
  adminApiSlice;
