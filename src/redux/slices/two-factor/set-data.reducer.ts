import { PayloadAction } from '@reduxjs/toolkit';

export const setTwoFactorDataReducer = (
  state: TwoFactorSliceI,
  action: PayloadAction<string[]>
) => {
  sessionStorage.setItem('mnemonic', JSON.stringify(action.payload));

  state.mnemonic = action.payload;

  return state;
}
