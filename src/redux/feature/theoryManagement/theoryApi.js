import { baseApi } from "../../api/baseApi";

const theoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCaterory: builder.query({
      query: ({ searchTerm, type, page }) => ({
        url: `/category/all-categories?testType=${type}&&searchTerm=${searchTerm}&&page=${page}`,
        method: "GET",
      }),
    }),
    getAllTopic: builder.query({
      query: ({page,testType}) => ({
        // url: `/topic/all-topics?category=${id}&&page=${page}&&testType=${testType}`,
        url: `/topic/all-topics?page=${page}&&testType=${testType}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (args) => ({
        url: `/category/create-category`,
        method: "POST",
        body: args,
      }),
    }),
    createTopic: builder.mutation({
      query: (args) => ({
        url: `/topic/create-topic`,
        method: "POST",
        body: args,
      }),
    }),
    createQues: builder.mutation({
      query: ({ args, id }) => ({
        url: `/question/create-question?topic=${id}`,
        method: "POST",
        body: args,
      }),
    }),
    getAllQues: builder.query({
      query: ({ id,searchTerm,page }) => ({
        url: `/question/get-all-question?topic=${id}&&page=${page}&&searchTerm=${searchTerm}`,
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ args, id }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: args,
      }),
    }),
    updateTopic: builder.mutation({
      query: ({ args, id }) => ({
        url: `/topic/update-topic/${id}`,
        method: "PATCH",
        body: args,
      }),
    }),
    updateQues: builder.mutation({
      query: ({ args, id }) => ({
        url: `/question/update-question/${id}`,
        method: "PATCH",
        body: args,
      }),
    }),
    // Mutation definition (RTK Query)
    deleteCategory: builder.mutation({
      query: (id) => {
        console.log("Received ID in mutation query:", id); // Log to see if the id is passed correctly
        return {
          url: `/category/delete-category/${id}`,
          method: "DELETE",
        };
      },
    }),
    deleteTopic: builder.mutation({
      query: (id) => {
        console.log("Received ID in mutation query:", id); // Log to see if the id is passed correctly
        return {
          url: `/topic/delete-topic/${id}`,
          method: "DELETE",
        };
      },
    }),
    deleteQues: builder.mutation({
      query: (id) => {
        console.log("Received ID in mutation query:", id); // Log to see if the id is passed correctly
        return {
          url: `/question/delete-question/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllCateroryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllTopicQuery,
  useCreateTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
  useCreateQuesMutation,
  useGetAllQuesQuery,
  useUpdateQuesMutation,
  useDeleteQuesMutation,
} = theoryApi;
