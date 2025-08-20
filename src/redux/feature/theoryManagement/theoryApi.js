import { baseApi } from "../../api/baseApi";

const theoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCaterory: builder.query({
      query: (searchTerm) => ({
        url:`/category/all-categories?testType=ADI&searchTerm=${searchTerm}`,
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
    updateCategory: builder.mutation({
    query: ({args,id}) => ({
        url:`/category/update-category/${id}`,
        method: "PATCH", 
        body:args   
      }),
    }),

  }),


    

});

export const {useGetAllCateroryQuery,useCreateCategoryMutation,useUpdateCategoryMutation} =theoryApi;
