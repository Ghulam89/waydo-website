import { PayloadAction } from '@reduxjs/toolkit'
import { PostSliceI } from './post.interface'

export const removeFileDataCreatePostFormReducer  = (state: PostSliceI, action: PayloadAction<number>) => {
	state.createForm.data.pictures.splice(action.payload, 1)

	state.createForm.data.pictures.map((p, i) => {
		p.isMain = i === 0
		return p
	})
	return state
}
