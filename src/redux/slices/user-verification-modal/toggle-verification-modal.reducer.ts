import { PayloadAction } from '@reduxjs/toolkit';

export const toggleVerificationModalReducer = (
  state: UserVerificationSliceI,
  action: PayloadAction<boolean>
) => {
  state.isModalActive = action.payload;

  return state;
}
