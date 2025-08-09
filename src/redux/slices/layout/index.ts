import { createSlice } from '@reduxjs/toolkit'
import { LayoutSliceSliceI } from './layout.interface'
import { updateLayoutReducer } from './update.reducer'

export const layoutSliceInitialState: LayoutSliceSliceI = {
	title: "",
	jsonLd: {},
	metadata: {},
	showModalAuth: false,
	showModalSignUp: false
}

export const layoutSlice = createSlice({
	initialState: layoutSliceInitialState,
	name: 'layout',
	reducers: {
		updateLayout: updateLayoutReducer
	}
})

export const { updateLayout  } = layoutSlice.actions
export default layoutSlice.reducer
