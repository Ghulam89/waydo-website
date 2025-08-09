import { createSlice } from '@reduxjs/toolkit';
import { setTwoFactorDataReducer } from './set-data.reducer';

export const twoFactorSliceInitialState: TwoFactorSliceI = {
  mnemonic: []
}

export const twoFactorSlice = createSlice({
  initialState: twoFactorSliceInitialState,
  name: 'twoFactor',
  reducers: {
    setTwoFactor: setTwoFactorDataReducer,
  }
})

export const { setTwoFactor } = twoFactorSlice.actions;

export default twoFactorSlice.reducer;
