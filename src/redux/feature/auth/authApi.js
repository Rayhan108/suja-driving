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
        url: '/auth/forget-password',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    resendOtp: builder.mutation({
      query: (args) => ({
        url: '/auth/resend-reset-code',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation({
      query: (args) => ({
        url: '/auth/verify-reset-otp',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    resetPass: builder.mutation({
      query: (args) => ({
        url: '/auth/reset-password',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (args) => ({
        url: '/auth/change-password',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
updateAdminProfile: builder.mutation({
      query: (args) => ({
        url: '/super-admin/update-profile',
        method: "PATCH",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),


  }),
});

export const { useLoginMutation,useResetPassMutation,useSendOtpMutation,useVerifyOtpMutation,useResendOtpMutation,useUpdateAdminProfileMutation,useChangePasswordMutation} = authApi;
