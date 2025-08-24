import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myProfile: builder.query({
      query: () => ({
        url: `/user/get-my-profile`,
        method: "GET",
      }),
    }),

    getAllUser: builder.query({
      query: ({ searchTerm, page }) => ({
        url: `/normal-user/get-all-user?searchTerm=${searchTerm}&&page=${page}`,
        method: "GET",
      }),
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/user/change-status/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useMyProfileQuery, useGetAllUserQuery,useBlockUserMutation } = userApi;
