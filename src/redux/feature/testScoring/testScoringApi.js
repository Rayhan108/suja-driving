import { baseApi } from "../../api/baseApi";

const testScoringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllTestResult: builder.query({
      query: (page) => ({
        url: `/result/get-all-results?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllTestResultQuery } = testScoringApi;
