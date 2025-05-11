import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLocation } from '@/context/features/setting/locationSlice';

export const locationapiSlice = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ipinfo.io/json/',
  }),
  endpoints: (builder) => ({
    sendIp: builder.mutation({
      query: () => ({
        url: '',
        method: 'GET',
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLocation({ ip: data.ip, country: data.country }));
        } catch (error) {
          console.error('Load Location failed:', error);
        }
      },
    }),
  }),
});

export const { useSendIpMutation } = locationapiSlice;
