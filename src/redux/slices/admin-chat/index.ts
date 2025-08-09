import { createSlice } from '@reduxjs/toolkit';
import { setAdminChatDataReducer } from './set-data.reducer';

export const adminChatSliceInitialState: AdminChatSliceI = {
  isBubbleOpen: false,
  isBubbleVisible: false,
}

export const adminChatSlice = createSlice({
  initialState: adminChatSliceInitialState,
  name: 'adminChat',
  reducers: {
    setAdminChat: setAdminChatDataReducer,
  }
})

export const { setAdminChat } = adminChatSlice.actions;

export default adminChatSlice.reducer;
