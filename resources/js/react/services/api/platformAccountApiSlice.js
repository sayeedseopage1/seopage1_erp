import { apiSlice } from "./apiSlice";


const platformAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    platformAccounts: build.query({
      query: () => `/account/platform-accounts`,
      providesTags: ["PlatformAccounts"],
    }),
    createPlatformAccount: build.mutation({
      query: (data) => ({
        url: `/account/platform-accounts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        const tags = ["PlatformAccounts"];
        if (result && !error) {

          return tags.map((tag) => ({ type: tag }));;
        }
      },
    }),
    updatePlatformAccount: build.mutation({
      query: (data) => ({
        url: `/account/platform-accounts/${data.id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        const tags = ["PlatformAccounts"];
        if (result && !error) {
          return tags.map((tag) => ({ type: tag }));
        }
      },
    }),
    singlePlatformAccount: build.query({
      query: (id) => `/account/platform-accounts/${id}`,
    }),
  }),
});


export const {
  usePlatformAccountsQuery,
  useCreatePlatformAccountMutation,
  useUpdatePlatformAccountMutation,
  useSinglePlatformAccountQuery,
} = platformAccountApiSlice;