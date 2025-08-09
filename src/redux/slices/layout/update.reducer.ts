import { DeepPartial } from '@interfaces/common'
import { PayloadAction } from '@reduxjs/toolkit'
import { LayoutSliceSliceI } from './layout.interface'

export const updateLayoutReducer = (state: LayoutSliceSliceI, action: PayloadAction<DeepPartial<LayoutSliceSliceI>>) => {
	return Object.assign(state, action.payload)
}
