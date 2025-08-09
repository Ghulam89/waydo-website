import { createSlice } from '@reduxjs/toolkit'
import { clearFilterReducer } from './clear.reducer'
import { filterDataInitial } from './filter.data'
import { FilterSliceI } from './filter.interface'
import { updateFilterReducer } from './update.reducer'

export const filterSliceInitialState: FilterSliceI = filterDataInitial

export const filterSlice = createSlice({
	initialState: filterSliceInitialState,
	name: 'filter',
	reducers: {
		updateFilter: updateFilterReducer,
		clearFilter: clearFilterReducer
	}
})

export const { updateFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer
