import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url:"/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    sendOtp: builder.mutation({
      query: (args) => ({
        url: '/admin/auth/forget-password/send-otp',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation({
      query: (args) => ({
        url: '/admin/auth/verify-otp',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    resetPass: builder.mutation({
      query: (args) => ({
        url: '/admin/auth/reset-password',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (args) => ({
        url: '/admin/auth/change-password',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),

  }),
});

export const { useLoginMutation,useChangePasswordMutation,useResetPassMutation,useSendOtpMutation,useVerifyOtpMutation} = authApi;
