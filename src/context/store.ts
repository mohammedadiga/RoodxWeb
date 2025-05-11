import { configureStore } from '@reduxjs/toolkit';
// API 
import { locationapiSlice } from './features/api/locationApi';
import { serverApi } from './features/api/serverApi';
// Reducers
import locationReducer from './features/setting/locationSlice';

const store = configureStore({
  reducer: {
    [locationapiSlice.reducerPath]: locationapiSlice.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware),
});

// ✅ Initialize app with essential data
const initializeApp = async () => {
  try {
    await Promise.all([store.dispatch(serverApi.endpoints.loadUser.initiate({})).unwrap()]);
  } catch (error) {
    // console.error('App initialization failed:', error);
  }
};

initializeApp();


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
