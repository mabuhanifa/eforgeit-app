import { baseApi } from "./baseApi";

export const assessmentApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startAssessment: builder.mutation({
      query: () => ({
        url: "/assessments/start",
        method: "POST",
      }),
    }),
    submitAssessment: builder.mutation({
      query: ({ id, answers }: { id: string; answers: any[] }) => ({
        url: `/assessments/${id}/submit`,
        method: "POST",
        data: { answers },
      }),
    }),
  }),
});

export const { useStartAssessmentMutation, useSubmitAssessmentMutation } =
  assessmentApiSlice;
