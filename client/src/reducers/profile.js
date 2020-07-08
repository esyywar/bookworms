import { GET_PROFILE, CLEAR_PROFILE, UPDATE_LIBRARY, PROFILE_ERROR } from '../actions/types'

const initialState = {
	profile: null,
	profiles: [],
	library: [],
	loading: true,
	error: {},
}

export const profile = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				library: action.payload.library,
				loading: false,
				error: {},
			}
		case UPDATE_LIBRARY:
			return {
				...state,
				library: action.payload,
				loading: false,
				error: {},
			}
		case PROFILE_ERROR:
			return {
				...state,
				profile: null,
				library: [],
				loading: false,
				error: action.payload.error,
			}
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				profiles: [],
				library: [],
				loading: false,
			}
		default:
			return state
	}
}
