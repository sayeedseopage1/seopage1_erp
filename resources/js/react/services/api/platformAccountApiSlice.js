import { apiSlice } from "./apiSlice";


const _token = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");


const platformAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllPlatformAccounts: build.query({
      query: (query) => `/account/platform-accounts${query || ""}`,
      providesTags: ["PlatformAccounts"],
    }),
    createPlatformAccount: build.mutation({
      query: (data) => ({
        url: `/account/platform-accounts`,
        method: "POST",
        body: data,
        headers: {
          "X-CSRF-TOKEN": _token,
        },
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
        url: `account/platform-accounts/${data.id}`,
        method: "PUT",
        body: data,
        headers: {
          "X-CSRF-TOKEN": _token,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        const tags = ["PlatformAccounts"];
        if (result && !error) {
          return tags.map((tag) => ({ type: tag }));
        }
      },
    }),
    updateStatusPlatformAccount: build.mutation({
      query: (data) => ({
        url: `/account/platform-accounts/update-status`,
        method: "POST",
        body: data,
        headers: {
          "X-CSRF-TOKEN": _token,
        },
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
  useGetAllPlatformAccountsQuery,
  useCreatePlatformAccountMutation,
  useUpdatePlatformAccountMutation,
  useUpdateStatusPlatformAccountMutation,
  useSinglePlatformAccountQuery,
} = platformAccountApiSlice;