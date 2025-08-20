import { baseApi } from "../../api/baseApi";

const theoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCaterory: builder.query({
      query: (searchTerm) => ({
        url:`/category/all-categories?testType=ADI&searchTerm=${searchTerm}`,
        method: "GET",      
      }),
    }),
    getAllTopic: builder.query({
      query: (id) => ({
        url:`/topic/all-topics`,
        method: "GET",      
      }),
    }),
    createCategory: builder.mutation({
      query: (args) => ({
        url:`/category/create-category`,
        method: "POST", 
        body:args   
      }),
    }),
    createTopic: builder.mutation({
      query: (args) => ({
        url:`/topic/create-topic`,
        method: "POST", 
        body:args   
      }),
    }),
    updateCategory: builder.mutation({
    query: ({args,id}) => ({
        url:`/category/update-category/${id}`,
        method: "PATCH", 
        body:args   
      }),
    }),
    updateTopic: builder.mutation({
    query: ({args,id}) => ({
        url:`/topic/update-topic/${id}`,
        method: "PATCH", 
        body:args   
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


  }),


    

});

export const {useGetAllCateroryQuery,useCreateCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useGetAllTopicQuery,useCreateTopicMutation,useUpdateTopicMutation} =theoryApi;
