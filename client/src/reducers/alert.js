import { SET_ALERT, RESET_ALERT } from '../actions/types'

const initialState = []

export const alerts = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALERT: {
			return [...state, action.payload]
		}
		case RESET_ALERT: {
			return state.filter((alert) => alert.id !== action.payload.id)
		}
		default:
			return state
	}
}
