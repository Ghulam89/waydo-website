import { DeepPartial } from '@interfaces/common'
import { PayloadAction } from '@reduxjs/toolkit'
import { DataCreateFormPostI, PostSliceI } from './post.interface'

export const updateDataCreatePostFormReducer  = (state: PostSliceI, action: PayloadAction<DeepPartial<DataCreateFormPostI>>) => {
	state.createForm.data = Object.assign(state.createForm.data, action.payload)
	return state
}
