import { baseApi } from "../../api/baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllFeedback: builder.query({
      query: (page) => ({
        url: `/feedback/all-feedbacks?page=${page}`,
        method: "GET",
      }),
    }),
    sendFeedback: builder.mutation({
      query: ({args,id}) => ({
        url: `/feedback/reply-feedback/${id}`,
        method: "PUT",
        body:args
      }),
    }),
  }),
});

export const { useGetAllFeedbackQuery,useSendFeedbackMutation } = feedbackApi;
