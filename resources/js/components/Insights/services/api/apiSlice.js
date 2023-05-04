import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['User', 'Goal', 'Dashboard', 'Report', 'Section', 'DataTable', 'Deal'],
    endpoints: () => ({}),
});

