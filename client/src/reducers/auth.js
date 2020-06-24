import {
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
} from '../actions/types'

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
}

export const authUser = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case LOGIN_FAILED:
			localStorage.removeItem('token')
			return {
				...state,
				isAuthenticated: false,
				loading: false,
			}
		case REGISTER_SUCCESS: {
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		}
		case REGISTER_FAILED: {
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			}
		}
		case USER_LOADED:
			localStorage.setItem('token', localStorage.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case AUTH_ERROR:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			}
		default:
			return state
	}
}
