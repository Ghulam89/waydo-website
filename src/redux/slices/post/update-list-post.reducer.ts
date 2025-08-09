import { DeepPartial } from '@interfaces/common'
import { PayloadAction } from '@reduxjs/toolkit'
import { ListPostI, PostSliceI } from './post.interface'

export const updateListPostReducer = (state: PostSliceI, action: PayloadAction<DeepPartial<ListPostI>>) => {
	state.list = Object.assign(state.list, action.payload)
	return state
}
