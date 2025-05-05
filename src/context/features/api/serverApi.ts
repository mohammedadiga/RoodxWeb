import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearUser, setUser } from '@/context/features/auth/authSlice';
import { IUser } from '@/interface/Auth.interface';

// Create a base query with credentials included (to send cookies)
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include', // Ensures cookies are sent with every request
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the request fails with a 401 (Unauthorized), try to refresh the token
  if (result.error?.status === 401) {
    console.log('🔄 Token expired, attempting to refresh...');

    // Attempt to refresh the token using the refresh token (from cookies or store)
    const refreshResult = await baseQuery({ url: 'auth/refresh', method: 'GET' }, api, extraOptions);

    if (refreshResult.error) {
      console.log('❌ Token refresh failed. Logging out user.');
      api.dispatch(clearUser());
      return result; // Return the original result (401 error)
    }

    console.log('✅ Token refreshed successfully. Fetching user data...');

    // Fetch user data after refreshing the token
    const userResult = await baseQuery({ url: 'session', method: 'GET' }, api, extraOptions);
    if (userResult.data) {
      api.dispatch(setUser({ user: (userResult.data as { user: IUser }).user }));
    }

    // Retry the original request with the refreshed token
    result = await baseQuery(args, api, extraOptions);
  }

  return result; // Always return the result
};

export const serverApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth, // Use the custom base query
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: () => ({ url: 'session', method: 'GET' }), // Fetch user session
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser({ user: (result.data as { user: IUser }).user }));
          console.log('✅ Token refreshed successfully. Login user.');
        } catch (error) {
          console.error('❌ Failed to load user in onQueryStarted');
          dispatch(clearUser());
        }
      },
    }),
  }),
});

export const { useLoadUserQuery } = serverApi;
