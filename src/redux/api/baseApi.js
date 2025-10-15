import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://54.228.201.37:5000",
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).auth.token;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }); 




export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery:baseQuery,
    tagTypes:["user"],
    endpoints:()=>({})
})

