import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    myProfile: builder.query({
      query: () => ({
        url:`/user/get-my-profile`,
        method: "GET",      
      }),
    }),
    
    getAllUser: builder.query({
      query: ({searchTerm,page}) =>({
        url:`/normal-user/get-all-user?searchTerm=${searchTerm}&&page=${page}`,
        method: "GET",      
      }),
    }),

  }),


    

});

export const {useMyProfileQuery,useGetAllUserQuery} =userApi;
