import { createSlice } from '@reduxjs/toolkit'
import { addFileDataCreatePostFormReducer } from "./add-file-data-create-post.reducer"
import { clearCreatePostFormReducer } from './clear-create-post.reducer'
import { DataCreateFormPostI, FileDataCreateFormPostI, PostSliceI } from './post.interface'
import { removeFileDataCreatePostFormReducer } from "./remove-file-data-create-post.reducer"
import { updateDataCreatePostFormReducer } from './update-data-create-post.reducer'
import { updateDataExtraCreatePostFormReducer } from './update-data-extras-create-post.reducer'
import { updateListPostReducer } from './update-list-post.reducer'
import { updateStepCreatePostFormReducer } from './update-step-create-post.reducer'

export const postSliceInitialState: PostSliceI = {
	createForm: {
		data: {
			pictures: [] as FileDataCreateFormPostI[],
			extras: [] as string[]
		} as DataCreateFormPostI,
		step: 0
	},
	list: {
		data: [],
		pagination: {
			take: 10,
			skip: 0,
		},
		total: 0,
		loading: false
	}
}

export const postSlice = createSlice({
	initialState: postSliceInitialState,
	name: 'post',
	reducers: {
		updateDataCreatePostForm: updateDataCreatePostFormReducer,
		updateDataExtraCreatePostForm: updateDataExtraCreatePostFormReducer,
		updateStepCreatePostForm: updateStepCreatePostFormReducer,
		clearCreatePostForm: clearCreatePostFormReducer,
		removeFileDataCreatePostForm: removeFileDataCreatePostFormReducer,
		addFileDataCreatePostForm: addFileDataCreatePostFormReducer,
		updateListPost: updateListPostReducer
	}
})

export const {
	clearCreatePostForm, updateDataCreatePostForm,
	updateStepCreatePostForm, addFileDataCreatePostForm,
	removeFileDataCreatePostForm, updateDataExtraCreatePostForm,
	updateListPost
} = postSlice.actions
export default postSlice.reducer
