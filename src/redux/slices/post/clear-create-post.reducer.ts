import { DataCreateFormPostI, FileDataCreateFormPostI, PostSliceI } from './post.interface'

export const clearCreatePostFormReducer = (state: PostSliceI) => {
	state.createForm = {
		data: {
			pictures: [] as FileDataCreateFormPostI[],
			extras: [] as string[]
		} as DataCreateFormPostI,
		step: 0
	}
	return state
}
