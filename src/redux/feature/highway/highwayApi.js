import { baseApi } from "../../api/baseApi";

const highwayApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllHighwayTopic: builder.query({
      query: () => ({
        url:`/sign-type/get-all`,
        method: "GET",      
      }),
    }),
    updateHighwayTopic: builder.mutation({
       query: ({args,id}) => ({
           url:`/sign-type/update/${id}`,
           method: "PATCH", 
           body:args        
         }),
       }),
    // Mutation definition (RTK Query)
   deleteHighwayTopic: builder.mutation({
     query: (id) => {
       // console.log("Received ID in mutation query:", id); // Log to see if the id is passed correctly
       return {
         url: `/sign-type/delete/${id}`,
         method: "DELETE",
       
       };
     },
   }),
      createHighwaySign: builder.mutation({
      query: (args) => ({
        url:`/sign-type/create`,
        method: "POST", 
        body:args   
      }),
    }),
  }),

});

export const {useGetAllHighwayTopicQuery,useUpdateHighwayTopicMutation,useDeleteHighwayTopicMutation,useCreateHighwaySignMutation} =highwayApi;
