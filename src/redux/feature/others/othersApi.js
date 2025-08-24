import { baseApi } from "../../api/baseApi";

const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


     addPrivacyPolicy: builder.mutation({
      query: () => ({
        url:`/manage/add-privacy-policy`,
        method: "POST",      
      }),
    }),
     addTermsPolicy: builder.mutation({
      query: () => ({
        url:`/manage/add-terms-conditions`,
        method: "POST",      
      }),
    }),

     getTerms: builder.query({
      query: () => ({
        url:`/manage/get-terms-conditions`,
        method: "GET",      
      }),
    }),
     getPrivacy: builder.query({
      query: () => ({
        url:`/manage/get-privacy-policy`,
        method: "GET",      
      }),
    }),

  }),


    

});

export const {useAddPrivacyPolicyMutation,useAddTermsPolicyMutation,useGetPrivacyQuery,useGetTermsQuery} = othersApi;
