import { PayloadAction } from '@reduxjs/toolkit'
import { IFile, PostSliceI } from './post.interface'

export const addFileDataCreatePostFormReducer  = (state: PostSliceI, action: PayloadAction<IFile>) => {
	state.createForm.data.pictures.push({
		file: action.payload,
		isMain: !state.createForm.data.pictures.length
	})
	return state
}
