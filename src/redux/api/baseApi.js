import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const baseQuery = fetchBaseQuery({
    baseUrl: "http://10.10.10.74:5007/v1",
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
    tagTypes:["user",'orders'],
    endpoints:()=>({})
})

