import { apiSlice } from "./apiSlice";

const clientApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        clientList: build.query({
            query: () => `/account/get-clients`,
        }),
    }),
});

export const { useClientListQuery } = clientApiSlice;
