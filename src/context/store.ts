import { configureStore } from '@reduxjs/toolkit';
// API slices
import { serverApi } from './features/api/serverApi';
// Reducers

const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
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
