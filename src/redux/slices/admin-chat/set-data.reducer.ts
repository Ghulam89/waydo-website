import { PayloadAction } from '@reduxjs/toolkit';

export const setAdminChatDataReducer = (
  state: AdminChatSliceI,
  action: PayloadAction<AdminChatSliceI>
) => {
  sessionStorage.setItem('adminChat', JSON.stringify(action.payload));

  state = action.payload;

  return state;
}
