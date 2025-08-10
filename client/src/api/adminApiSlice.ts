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
    addUser: builder.mutation({
      query: (user) => ({
        url: "/admin/users",
        method: "POST",
        data: user,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
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
    addQuestion: builder.mutation({
      query: (question) => ({
        url: "/admin/questions",
        method: "POST",
        data: question,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/questions/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Question", id }],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/admin/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
    getAnalytics: builder.query({
      query: () => ({ url: "/admin/reports/analytics", method: "GET" }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetAnalyticsQuery,
} = adminApiSlice;
