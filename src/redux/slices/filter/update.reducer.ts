import { DeepPartial } from '@interfaces/common'
import { PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceI } from './filter.interface'

export const updateFilterReducer = (state: FilterSliceI, action: PayloadAction<DeepPartial<FilterSliceI>>) => {
	return Object.assign(state, action.payload)
}
