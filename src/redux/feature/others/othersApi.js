import { baseApi } from "../../api/baseApi";

const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

     aboutUs: builder.mutation({
      query: () => ({
        url:`/about-us/create-or-update`,
        method: "POST",
      
      }),
    }),
     privacyPolicy: builder.mutation({
      query: () => ({
        url:`/privacy-policy/create-or-update`,
        method: "POST",      
      }),
    }),
     termsPolicy: builder.mutation({
      query: () => ({
        url:`terms-condition/create-or-update`,
        method: "POST",      
      }),
    }),
     createNewFaq: builder.mutation({
      query: () => ({
        url:`/faq/create`,
        method: "POST",      
      }),
    }),
     getAllFaq: builder.query({
      query: () => ({
        url:`/faq/retrieve`,
        method: "GET",      
      }),
    }),
     getAllSupport: builder.query({
      query: () => ({
        url:`/support/retrieve/all`,
        method: "GET",      
      }),
    }),

  }),


    

});

export const { useAboutUsMutation,usePrivacyPolicyMutation,useTermsPolicyMutation,useGetAllFaqQuery,useCreateNewFaqMutation,useGetAllSupportQuery} = othersApi;
