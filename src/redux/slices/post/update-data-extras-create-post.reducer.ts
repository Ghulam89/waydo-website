import { DeepPartial } from '@interfaces/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { PostSliceI } from './post.interface';

export const updateDataExtraCreatePostFormReducer = (state: PostSliceI, action: PayloadAction<DeepPartial<string>>) => {
	let extras = [...state.createForm.data.extras];

	if (!extras.includes(action.payload)) {
		extras.push(action.payload);
	} else {
		extras = extras.filter((d) => d !== action.payload);
	}
	state.createForm.data = Object.assign(state.createForm.data, {
		extras
	})
	return state
}
