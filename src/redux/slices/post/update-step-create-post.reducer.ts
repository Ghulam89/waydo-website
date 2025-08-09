import { PayloadAction } from '@reduxjs/toolkit'
import { PostSliceI } from './post.interface'

export const updateStepCreatePostFormReducer  = (state: PostSliceI, action: PayloadAction<number>) => {
	state.createForm.step = action.payload
	return state
}
