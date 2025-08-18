import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    myProfile: builder.query({
      query: () => ({
        url:`/user/get-my-profile`,
        method: "GET",      
      }),
    }),

  }),


    

});

export const {useMyProfileQuery} =userApi;
