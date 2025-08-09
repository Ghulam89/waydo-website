import { filterDataInitial } from './filter.data'
import { FilterSliceI } from './filter.interface'

export const clearFilterReducer = (state: FilterSliceI) => {
	state = filterDataInitial
	return state
}
