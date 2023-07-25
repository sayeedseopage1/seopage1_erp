import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['points_page_filter_options', 'TASK_STATUS'],
    endpoints: () => ({}),
});

