import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface location {
  ip: string;
  country: string;
}

const initialState: location = {
  ip: '',
  country: 'US',
};

const settingSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<{ ip: string; country: string }>) {
      state.ip = action.payload.ip;
      state.country = action.payload.country;
    },
  },
});

export const { setLocation } = settingSlice.actions;
export default settingSlice.reducer;
