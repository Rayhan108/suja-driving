import { baseApi } from "../../api/baseApi";

const hazardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllHazardTopic: builder.query({
      query: () => ({
        url:`/hazard-topic/get-all`,
        method: "GET",      
      }),
    }),
    updateHazardTopic: builder.mutation({
       query: ({args,id}) => ({
           url:`/hazard-topic/update/${id}`,
           method: "PATCH", 
           body:args        
         }),
       }),
    // Mutation definition (RTK Query)
   deleteHazardTopic: builder.mutation({
     query: (id) => {
       // console.log("Received ID in mutation query:", id); // Log to see if the id is passed correctly
       return {
         url: `/hazard-topic/delete/${id}`,
         method: "DELETE",
       
       };
     },
   }),
   deleteHazardVedio: builder.mutation({
     query: (id) => {
       // console.log("Received ID in mutation query:", id); // Log to see if the id is passed correctly
       return {
         url: `/hazard-video/delete/${id}`,
         method: "DELETE",
       
       };
     },
   }),
      getAllVedios: builder.query({
    query: (id) => ({
        url:`/hazard-video/get-all?hazardTopic=${id}`,
        method: "GET", 
  
      }),
    }),
      createHazVedio: builder.mutation({
      query: (args) => ({
        url:`/hazard-video/create`,
        method: "POST", 
        body:args   
      }),
    }),
      createHazTopic: builder.mutation({
      query: (args) => ({
        url:`/hazard-topic/create`,
        method: "POST", 
        body:args   
      }),
    }),
  }),

});

export const {useGetAllHazardTopicQuery,useUpdateHazardTopicMutation,useDeleteHazardTopicMutation,useGetAllVediosQuery,useCreateHazVedioMutation,useCreateHazTopicMutation,useDeleteHazardVedioMutation} =hazardApi;
