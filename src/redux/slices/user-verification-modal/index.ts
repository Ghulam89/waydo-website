import { createSlice } from '@reduxjs/toolkit';
import { toggleVerificationModalReducer } from './toggle-verification-modal.reducer';

export const verificationModalSliceInitialState: UserVerificationSliceI = {
  isModalActive: false
}

export const verificationModalSlice = createSlice({
  initialState: verificationModalSliceInitialState,
  name: 'verificationModal',
  reducers: {
    toggleModal: toggleVerificationModalReducer,
  }
})

export const { toggleModal } = verificationModalSlice.actions;

export default verificationModalSlice.reducer;
